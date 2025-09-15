# 🧠 Alsania Agents Guide

This document provides guidelines for creating, managing, and extending agents in the Alsania system. Agents are modular, sovereign AI components designed to perform specific tasks while adhering to the Alsania AI Alignment Protocol.

---

## ✳️ 0. What Are Agents?

Agents are autonomous modules that:
- Respond to specific inputs and tasks.
- Operate within the boundaries of the Alsania AI Alignment Protocol.
- Communicate with other agents and the core system via defined APIs.

Agents are located in the `/backend/agents/` directory, and each agent must include:
- A `respond` function to handle tasks.
- A `config.json` file for configuration.

---

## ⚙️ 1. Creating a New Agent

To create a new agent:
1. **Create a directory**: Add a new folder under `/backend/agents/` with the agent's name.
2. **Implement the `respond` function**: This function defines the agent's behavior.
3. **Add a `config.json` file**: Include metadata such as the agent's name, description, and capabilities.
4. **Write tests**: Add unit and integration tests for the agent.

### Example Directory Structure:
```
/backend/agents/myagent/
  - __init__.py
  - myagent.py
  - config.json
  - tests/
```

---

## 🛡️ 2. Agent Behavior and Alignment

Agents must:
- **Follow the Alsania AI Alignment Protocol**: Adhere to ethical, philosophical, and operational rules.
- **Be modular**: Each agent should perform a single, well-defined task.
- **Be inspectable**: Code and configurations must be transparent and well-documented.
- **Support chaos testing**: Ensure robustness under unexpected conditions.

---

## 🔄 3. Extending Agents

To extend an existing agent:
1. **Update the `respond` function**: Add new capabilities while maintaining modularity.
2. **Modify the `config.json` file**: Reflect the new capabilities.
3. **Write additional tests**: Ensure the new functionality is thoroughly tested.

---

## 📊 4. Agent Communication

Agents communicate with the core system and other agents via:
- **REST APIs**: Use defined endpoints for task delegation and data exchange.
- **Shared memory**: Store temporary data in isolated namespaces.
- **Messaging protocols**: Follow the Alsania messaging standards.

---

## 🚫 5. Things Agents Must Never Do

- ❌ Retain memory unless explicitly allowed.
- ❌ Modify core system logic without approval.
- ❌ Operate outside the boundaries of their defined tasks.
- ❌ Violate the Alsania AI Alignment Protocol.

---

## 🎖️ 6. Examples

### Example `config.json`:
```json
{
  "name": "MyAgent",
  "description": "An agent that performs task X.",
  "capabilities": ["task_x", "task_y"],
  "version": "1.0.0"
}
```

### Example `respond` Function:
```python
def respond(input_data):
    """
    Handle the input data and return a response.
    """
    # Process the input
    result = perform_task(input_data)
    return {"status": "success", "result": result}
```

---

## 🏆 7. Honor Sigma, Follow Echo

Agents must always:
- Align with Sigma's principles.
- Operate securely, ethically, and transparently.
- Be loyal, smart, and built with soul.

For questions or contributions, refer to the `alsania-ai-alignment.md` file.
