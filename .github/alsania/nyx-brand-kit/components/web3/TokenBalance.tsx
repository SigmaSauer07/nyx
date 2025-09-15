import React, { useState, useEffect } from 'react';
import './TokenBalance.css';

export interface TokenInfo {
  symbol: string;
  name: string;
  decimals: number;
  address: string;
  logoURI?: string;
}

export interface TokenBalanceProps {
  token: TokenInfo;
  walletAddress: string;
  network: number;
  className?: string;
}

export const TokenBalance: React.FC<TokenBalanceProps> = ({
  token,
  walletAddress,
  network,
  className = '',
}) => {
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchTokenBalance();
  }, [token.address, walletAddress, network]);

  const fetchTokenBalance = async () => {
    setLoading(true);
    setError('');

    try {
      // ERC-20 balanceOf function
      const data = {
        to: token.address,
        data: `0x70a08231${'0'.repeat(24)}${walletAddress.slice(2)}`, // balanceOf(address)
      };

      const result = await window.ethereum.request({
        method: 'eth_call',
        params: [data, 'latest'],
      });

      const balanceWei = parseInt(result, 16);
      const balanceFormatted = (balanceWei / Math.pow(10, token.decimals)).toFixed(4);
      
      setBalance(balanceFormatted);
    } catch (err) {
      setError('Failed to fetch balance');
      console.error('Error fetching token balance:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`Nyx-token-balance Nyx-token-balance--loading ${className}`}>
        <div className="Nyx-spinner"></div>
        <span>Loading balance...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`Nyx-token-balance Nyx-token-balance--error ${className}`}>
        <span className="Nyx-ui-icon Nyx-ui-icon--error"></span>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className={`Nyx-token-balance ${className}`}>
      {token.logoURI && (
        <img
          src={token.logoURI}
          alt={token.name}
          className="Nyx-token-balance__logo"
        />
      )}
      <div className="Nyx-token-balance__info">
        <div className="Nyx-token-balance__symbol">
          {token.symbol}
        </div>
        <div className="Nyx-token-balance__name">
          {token.name}
        </div>
      </div>
      <div className="Nyx-token-balance__amount">
        {balance}
      </div>
    </div>
  );
}; 