# Prompt Engineering Best Practices

A comprehensive guide to prompt engineering techniques for large language models (LLMs), covering clarity, examples, XML structuring, roles, long context, and output formatting.

---

This guide covers foundational techniques for getting better results from any modern LLM. It applies broadly across models such as Claude, GPT-4, Gemini, and others. Jump to the section that matches your situation.

## General principles

### Be clear and direct

LLMs respond well to clear, explicit instructions. Being specific about your desired output can help enhance results. If you want "above and beyond" behaviour, explicitly request it rather than relying on the model to infer this from vague prompts.

Think of an LLM as a brilliant but new employee who lacks context on your norms and workflows. The more precisely you explain what you want, the better the result.

**Golden rule:** Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they'd be confused, the model will be too.

- Be specific about the desired output format and constraints.
- Provide instructions as sequential steps using numbered lists or bullet points when the order or completeness of steps matters.

**Less effective:**
```text
Create an analytics dashboard
```

**More effective:**
```text
Create an analytics dashboard. Include as many relevant features and interactions as possible. Go beyond the basics to create a fully-featured implementation.
```

### Add context to improve performance

Providing context or motivation behind your instructions — explaining *why* something matters — helps the model better understand your goals and deliver more targeted responses.

**Less effective:**
```text
NEVER use ellipses
```

**More effective:**
```text
Your response will be read aloud by a text-to-speech engine, so never use ellipses since the text-to-speech engine will not know how to pronounce them.
```

Modern LLMs are smart enough to generalise from the explanation.

### Use examples effectively

Examples are one of the most reliable ways to steer output format, tone, and structure. A few well-crafted examples (known as **few-shot** or **multishot prompting**) can dramatically improve accuracy and consistency.

When adding examples, make them:
- **Relevant**: Mirror your actual use case closely.
- **Diverse**: Cover edge cases and vary enough that the model doesn't pick up unintended patterns.
- **Clearly marked**: Wrap examples in `<example>` tags (multiple examples in `<examples>` tags) so the model can distinguish them from instructions.

> Tip: Include 3–5 examples for best results. You can also ask the model to evaluate your examples for relevance and diversity, or to generate additional ones based on your initial set.

### Structure prompts with XML tags

XML tags help the model parse complex prompts unambiguously, especially when your prompt mixes instructions, context, examples, and variable inputs. Wrapping each type of content in its own tag — e.g. `<instructions>`, `<context>`, `<input>` — reduces misinterpretation.

Best practices:
- Use consistent, descriptive tag names across your prompts.
- Nest tags when content has a natural hierarchy (documents inside `<documents>`, each inside `<document index="n">`).

```xml
<task>
  <objective>Create a login endpoint</objective>
</task>

<requirements>
  <must>
    <item>Hash passwords with bcrypt</item>
    <item>Return JWT token</item>
  </must>
  <mustnot>
    <item>Store plaintext passwords</item>
  </mustnot>
</requirements>

<output>
  <file>src/routes/auth.ts</file>
  <format>TypeScript with JSDoc</format>
</output>
```

### Give the model a role

Setting a role in the system prompt focuses the model's behaviour and tone for your use case. Even a single sentence makes a difference:

```text
You are a senior software engineer who is focused on clean and extendable code.
```

Roles can be used to:
- Set expertise level (e.g. "You are a cybersecurity expert")
- Define tone (e.g. "You are a friendly teacher explaining to beginners")
- Restrict scope (e.g. "You are a SQL assistant. Only answer questions about databases.")

### Long context prompting

When working with large documents or data-rich inputs, structure your prompt carefully to get the best results:

- **Put longform data at the top**: Place your long documents and inputs near the top of your prompt, above your query, instructions, and examples. This can significantly improve performance.

  > Queries at the end can improve response quality by up to 30% in tests, especially with complex, multi-document inputs.

- **Structure document content and metadata with XML tags**: When using multiple documents, wrap each document in `<document>` tags with `<document_content>` and `<source>` subtags for clarity.

  ```xml
  <documents>
    <document index="1">
      <source>annual_report_2023.pdf</source>
      <document_content>
        {{ANNUAL_REPORT}}
      </document_content>
    </document>
    <document index="2">
      <source>competitor_analysis_q2.xlsx</source>
      <document_content>
        {{COMPETITOR_ANALYSIS}}
      </document_content>
    </document>
  </documents>

  Analyze the annual report and competitor analysis. Identify strategic advantages and recommend Q3 focus areas.
  ```

- **Ground responses in quotes**: For long document tasks, ask the model to quote relevant parts of the documents first before carrying out its task. This helps cut through noise and anchors the response to the source material.

  ```xml
  You are an AI physician's assistant. Your task is to help doctors diagnose possible patient illnesses.

  <documents>
    <document index="1">
      <source>patient_symptoms.txt</source>
      <document_content>
        {{PATIENT_SYMPTOMS}}
      </document_content>
    </document>
    <document index="2">
      <source>patient_records.txt</source>
      <document_content>
        {{PATIENT_RECORDS}}
      </document_content>
    </document>
  </documents>

  Find quotes from the patient records that are relevant to diagnosing the patient's reported symptoms. Place these in <quotes> tags. Then, based on these quotes, list all information that would help the doctor diagnose the patient's symptoms. Place your diagnostic information in <info> tags.
  ```

---

## Output and formatting

### Control the format of responses

There are a few particularly effective ways to steer output formatting:

1. **Tell the model what to do instead of what not to do**

   - Instead of: "Do not use markdown in your response"
   - Try: "Your response should be composed of smoothly flowing prose paragraphs."

2. **Use XML format indicators**

   - Try: "Write the prose sections of your response in `<smoothly_flowing_prose_paragraphs>` tags."

3. **Match your prompt style to the desired output**

   The formatting style used in your prompt may influence the response style. If you are experiencing formatting issues, try matching your prompt style to your desired output style. For example, removing markdown from your prompt can reduce the volume of markdown in the output.

4. **Use detailed prompts for specific formatting preferences**

   For more control over markdown and formatting usage, provide explicit guidance:

   ```text
   When writing reports, documents, technical explanations, analyses, or any long-form content,
   write in clear, flowing prose using complete paragraphs and sentences. Use standard paragraph
   breaks for organization and reserve markdown primarily for inline code and code blocks.

   DO NOT use ordered or unordered lists unless:
   a) you're presenting truly discrete items where a list format is the best option, or
   b) the user explicitly requests a list or ranking.

   Instead of listing items with bullets or numbers, incorporate them naturally into sentences.
   Your goal is readable, flowing text that guides the reader through ideas rather than
   fragmenting information into isolated points.
   ```

### Encourage step-by-step reasoning (Chain of Thought)

For complex tasks, ask the model to reason through the problem before giving a final answer. This technique — known as **chain-of-thought prompting** — reduces errors on multi-step problems.

```text
Think through this step by step before giving your final answer.
```

Or more explicitly:

```text
Before answering, write out your reasoning in <thinking> tags, then provide your final answer in <answer> tags.
```

### Document and artefact creation

Modern LLMs excel at creating presentations, reports, and structured documents. For best results:

```text
Create a professional presentation on [topic]. Include thoughtful structure, clear visual hierarchy,
and engaging content. Organise it into logical sections with a clear introduction and conclusion.
```

Be explicit about the format you want (e.g. Markdown, HTML, plain text) and any length constraints.

---

## Summary of key techniques

| Technique | When to use |
|---|---|
| Be clear and direct | Always — the most fundamental principle |
| Add context/motivation | When instructions might seem arbitrary |
| Few-shot examples | When format, tone, or style is hard to describe |
| XML tags | Complex prompts mixing instructions, context, and data |
| Assign a role | When you need consistent expertise or tone |
| Long context structure | Working with large documents or multiple sources |
| Chain-of-thought | Maths, logic, multi-step reasoning tasks |
| Format instructions | When default formatting doesn't match your needs |
