import React, { useState, useEffect } from 'react';
import './WalletConnect.css';

export interface WalletInfo {
  address: string;
  balance: string;
  network: string;
  chainId: number;
}

export interface WalletConnectProps {
  onConnect: (wallet: WalletInfo) => void;
  onDisconnect: () => void;
  supportedNetworks?: number[];
  className?: string;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  onConnect,
  onDisconnect,
  supportedNetworks = [1, 137, 56], // Ethereum, Polygon, BSC
  className = '',
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [error, setError] = useState<string>('');

  const connectWallet = async () => {
    setIsConnecting(true);
    setError('');

    try {
      if (!window.ethereum) {
        throw new Error('No wallet detected. Please install MetaMask or another Web3 wallet.');
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const address = accounts[0];
      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });

      // Check if network is supported
      if (!supportedNetworks.includes(parseInt(chainId, 16))) {
        throw new Error('Unsupported network. Please switch to a supported network.');
      }

      // Get balance
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      });

      const walletData: WalletInfo = {
        address,
        balance: (parseInt(balance, 16) / 1e18).toFixed(4),
        network: getNetworkName(parseInt(chainId, 16)),
        chainId: parseInt(chainId, 16),
      };

      setWalletInfo(walletData);
      onConnect(walletData);

      // Listen for account changes
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletInfo(null);
    onDisconnect();
    
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      // Update address
      setWalletInfo(prev => prev ? { ...prev, address: accounts[0] } : null);
    }
  };

  const handleChainChanged = (chainId: string) => {
    const newChainId = parseInt(chainId, 16);
    if (!supportedNetworks.includes(newChainId)) {
      setError('Unsupported network. Please switch to a supported network.');
      return;
    }

    setWalletInfo(prev => prev ? {
      ...prev,
      network: getNetworkName(newChainId),
      chainId: newChainId,
    } : null);
  };

  const getNetworkName = (chainId: number): string => {
    switch (chainId) {
      case 1: return 'Ethereum';
      case 137: return 'Polygon';
      case 56: return 'BSC';
      case 42161: return 'Arbitrum';
      case 10: return 'Optimism';
      default: return 'Unknown';
    }
  };

  const formatAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (walletInfo) {
    return (
      <div className={`Nyx-wallet Nyx-wallet--connected ${className}`}>
        <div className="Nyx-wallet__info">
          <div className="Nyx-wallet__address">
            {formatAddress(walletInfo.address)}
          </div>
          <div className="Nyx-wallet__network">
            {walletInfo.network}
          </div>
          <div className="Nyx-wallet__balance">
            {walletInfo.balance} ETH
          </div>
        </div>
        <button
          className="Nyx-btn Nyx-btn--secondary"
          onClick={disconnectWallet}
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className={`Nyx-wallet ${className}`}>
      {error && (
        <div className="Nyx-wallet__error">
          {error}
        </div>
      )}
      <button
        className="Nyx-btn Nyx-btn--primary"
        onClick={connectWallet}
        disabled={isConnecting}
      >
        {isConnecting ? (
          <>
            <span className="Nyx-spinner"></span>
            Connecting...
          </>
        ) : (
          <>
            <span className="Nyx-ui-icon Nyx-ui-icon--wallet"></span>
            Connect Wallet
          </>
        )}
      </button>
    </div>
  );
}; 