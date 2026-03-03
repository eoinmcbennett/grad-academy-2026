# Prompt Engineering — Claude-Specific Notes

This file is a supplement to [prompt-engineering.md](prompt-engineering.md). It covers behaviour and techniques specific to Anthropic's Claude models (Opus 4, Sonnet 4, Haiku 3.5 and later).

---

## Communication style and verbosity

Claude's latest models have a more concise and natural communication style compared to earlier versions:

- **More direct and grounded**: Provides fact-based progress reports rather than self-celebratory updates.
- **More conversational**: Slightly more fluent and colloquial, less machine-like.
- **Less verbose**: May skip detailed summaries for efficiency unless prompted otherwise.

This means Claude may skip verbal summaries after tool calls, jumping directly to the next action. If you prefer more visibility into its reasoning:

```text
After completing a task that involves tool use, provide a quick summary of the work you've done.
```

---

## Model self-knowledge

If you need Claude to identify itself correctly in your application or use specific API model strings, set this in the system prompt:

```text
The assistant is Claude, created by Anthropic. The current model is Claude Sonnet 4.5.
```

For LLM-powered apps that need to specify model strings programmatically:

```text
When an LLM is needed, please default to Claude Sonnet 4.5 unless the user requests otherwise.
The exact model string for Claude Sonnet 4.5 is claude-sonnet-4-5.
```

### Current model strings

| Model | API string |
|---|---|
| Claude Opus 4 | `claude-opus-4-5` |
| Claude Sonnet 4 | `claude-sonnet-4-5` |
| Claude Haiku 3.5 | `claude-haiku-3-5` |

> Always check the [Anthropic models overview](https://docs.anthropic.com/en/docs/about-claude/models/overview) for the latest model strings, as these are updated frequently.
