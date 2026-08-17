export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  tags: string[];
  readTime: string;
  author: string;
  createdAt: { seconds: number; nanoseconds: number } | string;
}

export const DEFAULT_BLOGS: BlogPost[] = [
  {
    id: "tcs-nqt-interview-questions-2026",
    slug: "tcs-nqt-interview-questions-2026",
    title: "TCS NQT Interview Questions 2026 (With Sample Answers)",
    excerpt: "Comprehensive guide to cracking the TCS National Qualifier Test (NQT) Technical, Coding, and MR/HR rounds with realistic sample answers and tips.",
    author: "InterviewXpert Placement Team",
    readTime: "8 min read",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    tags: ["TCS NQT", "Technical Interview", "Campus Placement", "Coding Rounds"],
    createdAt: "2026-08-15T10:00:00.000Z",
    content: `# TCS NQT Interview Questions 2026 (With Sample Answers)

Tata Consultancy Services (TCS) conducts the National Qualifier Test (NQT) annually to hire thousands of engineering freshers for **Ninja (3.36 LPA)** and **Digital (7.2+ LPA)** roles. The interview assesses three critical areas: **Technical Knowledge, Coding Competency, and Behavioral Managerial (MR/HR) Fit**.

In this guide, we break down the top questions asked in TCS interviews along with structured answers and preparation strategies.

---

## Part 1: Core Technical Questions

### Q1. What is the difference between Method Overloading and Method Overriding in Java/C++?
**Answer:**
- **Method Overloading** occurs within the same class where two or more methods have the exact same name but different parameters (number, type, or order). It is resolved at compile-time (Static Polymorphism).
- **Method Overriding** occurs between a Parent (Super) class and a Child (Sub) class where the subclass provides a specific implementation of a method already defined in the parent class with identical signature and return type. It is resolved at runtime (Dynamic Polymorphism).

\`\`\`java
// Overloading Example
class Calculator {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }
}

// Overriding Example
class Animal {
    void makeSound() { System.out.println("Animal sound"); }
}
class Dog extends Animal {
    @Override
    void makeSound() { System.out.println("Bark"); }
}
\`\`\`

---

### Q2. Explain the ACID properties in Database Management Systems (DBMS).
**Answer:**
ACID guarantees transaction reliability in relational databases:
1. **Atomicity:** The entire transaction executes successfully or gets completely rolled back ("All or Nothing").
2. **Consistency:** The database moves from one valid state to another, upholding all schema rules and constraints.
3. **Isolation:** Concurrent transactions execute independently without interfering with each other.
4. **Durability:** Once committed, changes survive system crashes and power failures in non-volatile storage.

---

### Q3. How does a Hash Table achieve O(1) time complexity for search?
**Answer:**
A Hash Table maps keys to bucket indices using a deterministic **hash function**. When a key is provided, the function computes the memory index directly without iterating through elements. Collisions are handled using techniques like **Chaining (Linked Lists/Red-Black Trees)** or **Open Addressing (Linear/Quadratic Probing)**.

---

## Part 2: TCS Coding Problem Examples

TCS Digital interviews focus heavily on Data Structures & Algorithms. Practice writing clean code:

### Problem: Reverse words in a given string
\`\`\`typescript
function reverseWords(s: string): string {
    return s.trim().split(/\\s+/).reverse().join(' ');
}
console.log(reverseWords("TCS Digital Coding Round")); // "Round Coding Digital TCS"
\`\`\`

---

## Part 3: TCS HR & Situational Questions

### "Why do you want to join TCS over other IT service firms?"
**Recommended Framework:**
> *"TCS is a global pioneer with exceptional training infrastructure at Trivandrum and a massive breadth of Fortune 500 digital transformation projects. For a fresher, the research culture, stability, and internal upskilling platforms (like Elevate Wings) offer a structured pathway to master cloud and AI architectures."*

---

## Practice Live with AI Feedback
Before heading into your real interview, practice with our [TCS Mock Interview Track](/tcs-mock-interview) on InterviewXpert. Get real-time speech analysis, live proctoring checks, and instant feedback.
`
  },
  {
    id: "top-20-infosys-interview-questions",
    slug: "top-20-infosys-interview-questions",
    title: "Top 20 Infosys Interview Questions and How to Answer Them",
    excerpt: "Master the Infosys Specialist Programmer (SP), Digital Specialist Engineer (DSE), and Systems Engineer interview rounds with expert answers.",
    author: "InterviewXpert Technical Team",
    readTime: "9 min read",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
    tags: ["Infosys", "Specialist Programmer", "DSE", "Tech Interview"],
    createdAt: "2026-08-14T12:00:00.000Z",
    content: `# Top 20 Infosys Interview Questions and How to Answer Them

Infosys recruits freshers and lateral engineers for three primary engineering tiers:
1. **Systems Engineer (SE)** - 3.6 LPA
2. **Digital Specialist Engineer (DSE)** - 6.25 LPA
3. **Specialist Programmer (SP)** - 9.5 LPA

To succeed, candidates must demonstrate solid fundamentals in OOPs, Data Structures, SQL Normalization, and practical project architecture.

---

## Top Technical Questions

### 1. What are the 4 Pillars of Object-Oriented Programming?
1. **Encapsulation:** Binding data variables and methods together within a class while restricting direct access via private modifiers.
2. **Abstraction:** Hiding complex implementation details and exposing only essential interface functionalities.
3. **Inheritance:** Enabling a class to acquire properties and methods of a parent class to promote reusability.
4. **Polymorphism:** Allowing an entity (method or operator) to take multiple forms (Compile-time vs Runtime).

---

### 2. What is the difference between Primary Key, Unique Key, and Foreign Key?
- **Primary Key:** Uniquely identifies each record in a table. Cannot contain \`NULL\` values; only one primary key per table.
- **Unique Key:** Prevents duplicate values in a column but allows a single \`NULL\` value.
- **Foreign Key:** References the Primary Key of another table to establish a relational link between them.

---

### 3. What is the time and space complexity of QuickSort?
- **Average & Best Time Complexity:** $O(n \\log n)$
- **Worst Time Complexity:** $O(n^2)$ (when pivot selection is skewed, e.g., already sorted array with last element pivot)
- **Space Complexity:** $O(\\log n)$ recursive call stack space.

---

### 4. Explain the difference between Process and Thread.
- A **Process** is an independent executing program with its own dedicated memory address space and OS resources.
- A **Thread** is a lightweight sub-process that runs within a parent process, sharing its memory and resources while executing concurrently.

---

## Infosys Specialist Programmer (SP) Coding Tips
For SP candidates, questions often involve:
- Dynamic Programming (Knapsack, Longest Common Subsequence)
- Graph Algorithms (Dijkstra, BFS/DFS, Disjoint Set Union)
- Tree Traversals (Lowest Common Ancestor, Binary Tree Inversion)

Practice live coding challenges on our [Infosys Mock Interview Simulator](/infosys-mock-interview).
`
  },
  {
    id: "how-to-prepare-for-technical-interview-in-7-days",
    slug: "how-to-prepare-for-technical-interview-in-7-days",
    title: "How to Prepare for a Technical Interview in 7 Days",
    excerpt: "A day-by-day structured preparation roadmap to master Data Structures, System Design, Resume projects, and Behavioral rounds in one week.",
    author: "Aaradhya Pathak",
    readTime: "7 min read",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    tags: ["Interview Strategy", "Roadmap", "DSA", "Career Growth"],
    createdAt: "2026-08-12T08:00:00.000Z",
    content: `# How to Prepare for a Technical Interview in 7 Days

When you have only 7 days before an important tech interview, passive reading won't work. You need an intense, high-yield structured sprint.

---

## Day 1: Arrays, Strings & HashMaps
- Revise Two Pointers and Sliding Window patterns.
- Solve 5 classic problems: Two Sum, Valid Anagram, Container With Most Water, Longest Substring Without Repeating Characters.
- Review Time & Space Big-O notation.

## Day 2: LinkedLists, Stacks & Queues
- Reversing a linked list (Iterative & Recursive).
- Detecting cycles using Floyd's Tortoise and Hare algorithm.
- Valid Parentheses using Stack and Min Stack implementation.

## Day 3: Trees & Binary Search
- Binary Tree Inorder, Preorder, Postorder & Level-Order Traversals.
- Validating a Binary Search Tree (BST).
- Lowest Common Ancestor (LCA).

## Day 4: Dynamic Programming & Graphs
- Understand Memoization vs Tabulation.
- 0/1 Knapsack, Coin Change, and Longest Increasing Subsequence.
- Graph representations (Adjacency List vs Matrix) and BFS/DFS traversals.

## Day 5: Core CS Subjects & DBMS
- Database Normalization (1NF, 2NF, 3NF, BCNF) and SQL Joins.
- Operating Systems: Deadlock conditions, Semaphore vs Mutex, Virtual Memory.
- Computer Networks: TCP vs UDP, HTTP/HTTPS handshake, OSI 7-Layer model.

## Day 6: Resume Deep-Dive & System Design
- Prepare a 2-minute elevator pitch for your top 2 resume projects.
- Be ready to draw architecture diagrams: frontend, backend APIs, database choice, and caching layer.
- Ensure your resume ATS keywords match the job description using the [InterviewXpert ATS Resume Analyzer](/).

## Day 7: Live AI Mock Interviews & HR Polish
- Take at least 2 full-length conversational mock interviews on [InterviewXpert](/auth).
- Check your video proctoring metrics: eye contact, speech rate (130-150 words/min), and fluency score.
`
  },
  {
    id: "common-coding-interview-mistakes-and-how-ai-fixes-them",
    slug: "common-coding-interview-mistakes-and-how-ai-fixes-them",
    title: "Common Coding Interview Mistakes (And How AI Mock Interviews Fix Them)",
    excerpt: "Discover why 70% of tech candidates fail live coding rounds and how AI simulations build instinct for edge cases, complexity analysis, and communication.",
    author: "Nimesh Kulkarni",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    tags: ["Coding Mistakes", "AI Practice", "Software Engineering"],
    createdAt: "2026-08-10T14:00:00.000Z",
    content: `# Common Coding Interview Mistakes (And How AI Mock Interviews Fix Them)

Most candidates believe coding interviews are purely about solving the algorithm. In reality, hiring managers evaluate **communication, boundary condition handling, and thought process transparency**.

---

## 1. Jumping Straight into Code Without Clarifying
- **The Mistake:** Writing code within 30 seconds of hearing the problem statement without asking about input bounds or edge cases (null inputs, empty arrays, negative integers).
- **The Fix:** Spend the first 3 minutes repeating the problem in your own words, stating assumptions, and confirming constraints.

## 2. Silent Coding (The Black Box Effect)
- **The Mistake:** Typing silently for 15 minutes. The interviewer has no visibility into your logic.
- **The Fix:** Practice "Thinking Out Loud". Explain *why* you are choosing a HashMap over nested loops before typing a single line.

## 3. Ignoring Time and Space Complexity
- **The Mistake:** Submitting an $O(n^2)$ brute-force solution without mentioning potential optimizations.
- **The Fix:** State the brute-force approach first, compute its complexity, and immediately explain how sorting or a two-pointer approach optimizes it to $O(n \\log n)$ or $O(n)$.

---

## How InterviewXpert AI Solves These Gaps
Our AI mock interviewer prompts you during the session just like a senior engineer:
- *"What happens if the input array contains duplicate elements?"*
- *"Can we reduce the auxiliary space from $O(n)$ to $O(1)$?"*

Experience it live on our [Coding Interview Practice Platform](/coding-interview-practice).
`
  },
  {
    id: "wipro-elite-nlth-vs-tcs-nqt-differences",
    slug: "wipro-elite-nlth-vs-tcs-nqt-differences",
    title: "Wipro Elite NLTH vs TCS NQT: Interview Format Differences",
    excerpt: "Detailed comparison of hiring stages, coding difficulty, syllabus, and interview styles between Wipro Elite and TCS NQT drives.",
    author: "InterviewXpert Research",
    readTime: "7 min read",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop",
    tags: ["Wipro Elite", "TCS NQT", "Comparison", "Placement Guide"],
    createdAt: "2026-08-08T11:00:00.000Z",
    content: `# Wipro Elite NLTH vs TCS NQT: Interview Format Differences

Both TCS and Wipro conduct nationwide campus recruitment drives for engineering graduates across India. While both evaluate aptitude and technical foundations, their test structures and interview dynamics have distinct nuances.

---

## Comparison Matrix

| Feature | TCS NQT (Ninja / Digital) | Wipro Elite NTH (Turbo) |
| :--- | :--- | :--- |
| **Hiring Package** | Ninja: 3.36 LPA, Digital: 7.2+ LPA | Elite: 3.5 LPA, Turbo: 6.5+ LPA |
| **Aptitude Section** | Numerical, Verbal, Reasoning Ability | Quantitative, Logical, Verbal + Written Essay |
| **Coding Round** | 2 Questions (1 Easy-Medium, 1 Hard) | 2 Questions (Basic to Intermediate) |
| **Written Communication** | Integrated in Verbal MCQ | Mandatory 20-min Essay Writing test |
| **Technical Interview** | Heavy focus on Core CS + Resume Projects | Moderate CS basics + Basic Problem Solving |
| **Managerial Round** | Combined with HR in TCS | Separate Technical + HR rounds |

---

## Key Preparation Advice

1. **For Wipro Elite:** Pay special attention to the Written Communication (Essay) round. Ensure grammatical precision and clear paragraph structuring.
2. **For TCS Digital:** Practice advanced dynamic programming, SQL joins, and cloud fundamentals.

Start your preparation on the [Wipro Mock Interview Track](/wipro-mock-interview) or [TCS Mock Interview Track](/tcs-mock-interview).
`
  }
];
