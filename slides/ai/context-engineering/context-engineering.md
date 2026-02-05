---
theme: default
title: Context Engineering
transition: view-transition
mdc: true
---

# Context Engineering

---

# What is Context Engineering?

The art of providing AI models with the right information at the right time.

- **Context** = all the information an LLM sees when generating a response
- Goes beyond prompt engineering to include tools, files, memory, and system design
- Think of it as "curating the perfect briefing document" for your AI assistant

The right amount of information doesn't mean all of the information!

---

# Why Do I Need It?

LLMs are powerful but they have limitations:

- **No memory** - Each conversation starts fresh
- **Knowledge cutoff** - Training data has an end date
- **Hallucinations** - More likely without proper context
- **Eagerness** - LLMs love to implement things you didn't necessarily ask for.


## Good context leads to:
- More accurate responses
- Fewer hallucinations
- Better code suggestions
- Less back-and-forth iteration
- A well documented plan / solution

---

# Manual Context Handling
# Conversation 1
- Generate an implementation plan
- Review and refine it with the model

# Conversation 2
- Point the model at the implemenation plan
- Let it execute and build your plan

Essentially you start new conversations strategically when your context starts to fill up.
It's helpful to ask the model to document it's work for future iterations
---

# Automatic Context Handling
Sub agent architectures to break work up into manageable chunks between agents.

Each agent gets a fresh context window to play with.

This saves you having to create new chats manually.

We'll explore an architecture for this next

---
layout: default
---

# The Ralph Wiggum Loop

This is an autonomous AI Agent loop that runs repeatedly until all work items are complete.

Ralph runs in a loop where each iteration gets fresh context
- AI reads a spec to see what needs done
- AI implements one part of the spec
- Automated tests run
- AI updates spec with result of implemenation
- Loop restarts

Not many tools automate the Ralph process at the minute but it's still valuable to know!
Even running this manually is a good way of developing with AI.

--- 

# Exercise: Let's build something.

**Time:** 45 minutes

Prompt your way to a small website, but this time define your exact requirements.

Use the concepts we've gone through to generate an implementation plan before you start!

## Guidelines
- Limit it to simple ideas.
- Document any difficulties you encounter
- Document how the model behaves.

---
layout: center

---

# Exercise: Debrief

**Time:** 15 minutes

Form groups of 3-5 and compare your findings.

Report back any common themes or findings after.

---
layout: end
---

# Questions?

