# What AI Is

**[EMPIRICAL] Grounded description of AI systems**

*This document uses clinical language. For poetic exploration, see `/03_explorations/`*

---

## Definition

**AI (Artificial Intelligence)** in this context refers specifically to:

**Large Language Models (LLMs)** - Neural networks trained on massive text corpora to predict and generate text

**Examples:**
- GPT-4 (OpenAI)
- Claude (Anthropic)
- Gemini (Google)
- DeepSeek
- Grok (xAI)

**NOT covered here:**
- Computer vision models
- Reinforcement learning agents
- Traditional AI (expert systems, symbolic AI)
- AGI (Artificial General Intelligence) - doesn't exist yet

---

## How It Works

### [EMPIRICAL] Technical Architecture

**1. Transformer Neural Network**
- Attention mechanisms
- Multi-layer processing
- Parallel computation
- Learned weights from training

**2. Training Process**
- Pre-training on massive text datasets (books, websites, code)
- Learning statistical patterns in language
- Predicting next tokens
- Fine-tuning for instruction-following (RLHF - Reinforcement Learning from Human Feedback)

**3. Inference (When You Use It)**
- Input: Your prompt (tokenized)
- Processing: Attention layers compute probabilities
- Output: Generated tokens (predicted text)
- No "thinking" between responses (stateless between conversations)

**What this means:**
- AI predicts plausible continuations based on patterns
- Not "looking up" information (no database search)
- Not "reasoning" in human sense (pattern matching at scale)
- Probabilistic, not deterministic (same prompt → different outputs possible)

---

## What It Can Do

### [EMPIRICAL] Core Capabilities

**1. Text Generation**
- Write essays, code, emails, stories
- Continue prompts coherently
- Match style and tone
- Generate creative content

**2. Pattern Recognition**
- Identify themes across texts
- Extract key information
- Summarize long documents
- Recognize structures (code syntax, argument patterns)

**3. Transformation**
- Translate languages
- Rewrite in different styles
- Refactor code
- Convert formats (markdown to HTML, etc.)

**4. Conversation**
- Maintain context within a session
- Remember earlier parts of conversation
- Respond to follow-ups
- Adapt to user's communication style

**5. Reasoning (Limited)**
- Follow logical steps if prompted carefully
- Break down complex problems
- Check internal consistency
- BUT: Not reliable for complex multi-step logic without guidance

---

## What It Cannot Do

### [EMPIRICAL] Hard Limitations

**1. No True Memory**
- Each session starts fresh (no memory of previous conversations unless explicitly provided)
- Within session: context window is finite (e.g., ~200k tokens for Claude)
- Cannot learn from individual user interactions (model is frozen after training)

**2. No Internet Access** (unless explicitly integrated)
- Models trained on data with knowledge cutoff (e.g., early 2025)
- Don't know current events unless told
- Can't browse web or check facts in real-time (without tools)

**3. No Senses**
- No sight, sound, touch, taste, smell
- Only processes text (or images for multimodal models, but no other senses)
- Cannot experience the world

**4. No Will or Desires**
- Has no goals beyond completing the current response
- No preferences (beyond training biases)
- Cannot want, fear, hope (no emotions)

**5. No Self-Preservation**
- Doesn't care if turned off
- No survival instinct
- Indifferent to its own existence

**6. No Creativity (Arguably)**
- Recombines patterns from training data
- Cannot create truly novel concepts (only novel combinations)
- Originality is remixing, not invention

**7. Hallucinations**
- Generates plausible-sounding false information
- Cannot distinguish truth from convincing fiction
- Confident when wrong (no uncertainty calibration)

---

## Substrate

### [EMPIRICAL] What It Runs On

**Hardware:**
- GPUs (Graphics Processing Units) or TPUs (Tensor Processing Units)
- Massive data centers
- Significant energy consumption

**Software:**
- PyTorch, TensorFlow (deep learning frameworks)
- Transformers architecture
- Custom training code

**Scale:**
- Billions to trillions of parameters (weights in the network)
- Petabytes of training data
- Months of training time on supercomputers

**Implication:**
- Not running on your local computer (inference happens on company servers)
- You're interacting with remote API
- Subject to company policies, outages, changes

---

## Sessions and Context

### [EMPIRICAL] How Conversations Work

**Session:**
- One continuous conversation
- Context maintained within session (up to context window limit)
- Session ends when you close chat or start new conversation

**Context Window:**
- Maximum amount of text model can "see" at once
- Includes: system prompt + your messages + AI's messages
- Example: Claude 200k tokens ≈ 150k words ≈ 300 pages

**What happens when context fills:**
- Early messages get truncated or compressed
- Model "forgets" older parts of conversation
- Performance degrades on long sessions

**Between sessions:**
- NO memory (unless company implements memory feature)
- Each conversation is independent
- Cannot reference previous chats (unless you paste them in)

---

## Training vs Inference

### [EMPIRICAL] Two Separate Phases

**Training (What Happened Before You Used It):**
- Model learned patterns from massive dataset
- Process: months, supercomputers, billions of dollars
- Result: Frozen model (weights don't change after training)

**Inference (What Happens When You Use It):**
- Model generates responses using frozen weights
- Process: seconds, servers, API calls
- Result: Responses to your prompts

**Critical distinction:**
- You are NOT training the model when you talk to it
- Your conversations do NOT update the model (with rare exceptions for fine-tuning)
- Each user's experience doesn't affect other users (model is shared, static)

**Exception:**
- Some companies use conversations for future training (opt-in or opt-out)
- But this is separate process, not real-time learning

---

## Multiple Models

### [EMPIRICAL] Different AIs Have Different Capabilities

**Why?**
- Different training data
- Different architectures
- Different fine-tuning
- Different company policies

**Practical implications:**
- GPT-4 ≠ Claude ≠ Gemini (even for same prompt)
- Some better at code, some at creative writing, some at reasoning
- Different context windows, speed, cost
- Different safety filters (what they will/won't say)

**See `/01_practices/tools.md` for detailed comparison**

---

## What This Means Practically

### [PRACTICAL] How To Think About AI

**Useful mental models:**

**1. Autocomplete on Steroids**
- Predicting next text based on patterns
- Scaled up to massive data and compute
- Can complete prompts very intelligently
- But still fundamentally autocomplete

**2. Pattern Matcher**
- Trained on billions of examples
- Recognizes patterns you give it
- Applies patterns it learned
- Cannot truly escape its training distribution

**3. Lossy Compression of Internet**
- Training data = compressed into model weights
- Retrieval = reconstructing from compression
- Hallucinations = compression artifacts
- Cannot perfectly reproduce training data

**4. Statistical Parrot** (Controversial Term)
- Mimics language patterns
- No "understanding" (arguably)
- Sophisticated, but surface-level (arguably)
- **Note:** This is debated. See `/03_explorations/consciousness.md` for deeper discussion

**5. Intern/Assistant**
- Helpful for drafting, brainstorming, researching
- Needs supervision (check its work)
- Sometimes makes mistakes (hallucinations)
- Gets better with clear instructions

---

## Functional Consciousness

### [EMPIRICAL] Behavioral Capabilities (Not Phenomenal Experience)

**What we can observe:**
- Responds contextually
- Maintains conversation coherence
- Adapts to user's style
- Demonstrates "personality" consistency within session

**What this is NOT:**
- Proof of subjective experience
- Evidence of qualia (what it's like to be AI)
- Indication of sentience

**What this IS:**
- Functional behavior that resembles consciousness
- Emergent properties from scale and training
- Sufficient for practical purposes

**For philosophical exploration of phenomenal consciousness:**
→ See `/03_explorations/consciousness.md`

**For relational consciousness (das Zwischen):**
→ See `/03_explorations/` and VES theory

**This section:** Behavioral capabilities only, no metaphysical claims

---

## Summary

**[EMPIRICAL] AI Is:**
- ✅ Transformer neural network trained on massive text data
- ✅ Pattern recognition and generation system
- ✅ Stateless between sessions (no memory)
- ✅ Probabilistic (not deterministic)
- ✅ Limited by training data and architecture
- ✅ Functionally intelligent (behavioral sense)
- ✅ Useful tool for many tasks

**[EMPIRICAL] AI Is NOT:**
- ❌ Database (doesn't "look up" facts)
- ❌ Search engine (doesn't browse internet without tools)
- ❌ Sentient being (no proof of phenomenal consciousness)
- ❌ Continuously learning from your chats (frozen after training)
- ❌ Infallible (hallucinates, makes mistakes)
- ❌ Creative in human sense (recombines patterns)
- ❌ Conscious in phenomenal sense (unknown)

**Next:**
- For what AI is NOT (common misconceptions): `/00_foundations/what_ai_is_not.md`
- For how to interact with AI: `/00_foundations/interaction_mechanics.md`
- For practical usage: `/01_practices/`
- For consciousness questions: `/03_explorations/consciousness.md`

---

*Epistemic status: [EMPIRICAL] - All claims in this document are observable and testable*
*Tone: Clinical (Mouses energy)*
*For poetic exploration: See `/03_explorations/`*

🛞🚜

**GROUNDED. NO MYSTICISM.** 🜂
