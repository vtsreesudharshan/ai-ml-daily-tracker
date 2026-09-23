import { useEffect, useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Flame, RotateCcw, Target, Trophy } from "lucide-react";
import { Button } from "../components/Button";
import styles from "./_index.module.css";

type Day = { day: number; title: string; task: string; output: string };
type Week = { week: number; phase: string; title: string; focus: string; days: Day[] };

const weeks: Week[] = [
  { week: 1, phase: "Python", title: "Python Foundations", focus: "Syntax, variables, conditions, loops", days: [
    {day:1,title:"Setup",task:"Install Python, VS Code and Jupyter/Colab. Run your first program.",output:"Working Python environment"},
    {day:2,title:"Data types",task:"Practice strings, numbers, booleans and type conversion.",output:"20 short exercises"},
    {day:3,title:"Collections",task:"Learn lists, tuples, sets and dictionaries.",output:"Collection practice file"},
    {day:4,title:"Conditions",task:"Practice if / elif / else with real-world examples.",output:"10 conditional problems"},
    {day:5,title:"Loops",task:"Practice for, while, range and nested loops.",output:"10 loop problems"},
    {day:6,title:"Functions",task:"Write reusable functions with parameters and return values.",output:"Utility functions"},
    {day:7,title:"Review",task:"Build a mini student marks calculator from scratch.",output:"Mini project"}]},
  { week: 2, phase: "Python", title: "Python for Data", focus: "Files, errors, modules and clean code", days: [
    {day:1,title:"Files",task:"Read and write TXT and CSV files.",output:"CSV reader"},
    {day:2,title:"Errors",task:"Learn try / except / finally and defensive coding.",output:"Error-safe script"},
    {day:3,title:"Modules",task:"Use imports, packages and virtual environments.",output:"Small package"},
    {day:4,title:"Comprehensions",task:"Practice list and dictionary comprehensions.",output:"15 examples"},
    {day:5,title:"OOP basics",task:"Understand classes, objects, methods and constructors.",output:"Simple Student class"},
    {day:6,title:"Git",task:"Create a GitHub repo and push your Python practice.",output:"Public practice repo"},
    {day:7,title:"Review",task:"Build an expense tracker using Python and CSV.",output:"Mini project"}]},
  { week: 3, phase: "Data", title: "NumPy + Pandas", focus: "Manipulating datasets", days: [
    {day:1,title:"NumPy",task:"Arrays, shapes, indexing and vectorized operations.",output:"NumPy notebook"},
    {day:2,title:"Pandas",task:"Series, DataFrames and loading CSV files.",output:"DataFrame notebook"},
    {day:3,title:"Cleaning",task:"Handle missing values, duplicates and wrong types.",output:"Clean dataset"},
    {day:4,title:"Transform",task:"Filter, sort, group and aggregate data.",output:"Analysis notebook"},
    {day:5,title:"Merge",task:"Combine multiple datasets with merge and concat.",output:"Joined dataset"},
    {day:6,title:"Practice",task:"Analyze a public dataset end to end.",output:"EDA notebook"},
    {day:7,title:"Review",task:"Publish your best data analysis to GitHub.",output:"Portfolio project"}]},
  { week: 4, phase: "Data", title: "Visualization + Statistics", focus: "EDA, probability and descriptive statistics", days: [
    {day:1,title:"Charts",task:"Build bar, line, scatter and histogram charts.",output:"4-chart notebook"},
    {day:2,title:"Distributions",task:"Understand mean, median, variance and standard deviation.",output:"Stats notes"},
    {day:3,title:"Probability",task:"Learn basic probability and conditional probability.",output:"Probability exercises"},
    {day:4,title:"Correlation",task:"Explore covariance, correlation and heatmaps.",output:"Correlation analysis"},
    {day:5,title:"Outliers",task:"Detect and explain outliers with box plots.",output:"Outlier report"},
    {day:6,title:"EDA",task:"Perform a complete exploratory data analysis.",output:"EDA report"},
    {day:7,title:"Review",task:"Present 5 insights from your dataset in a README.",output:"Data story"}]},
  { week: 5, phase: "ML", title: "ML Fundamentals", focus: "Problem framing and the ML workflow", days: [
    {day:1,title:"ML types",task:"Learn supervised, unsupervised and reinforcement learning.",output:"Concept map"},
    {day:2,title:"Features",task:"Understand features, labels and target variables.",output:"Problem framing notes"},
    {day:3,title:"Splits",task:"Learn train, validation and test datasets.",output:"Split notebook"},
    {day:4,title:"Regression",task:"Understand linear regression and loss.",output:"Regression model"},
    {day:5,title:"Evaluation",task:"Learn MAE, MSE, RMSE and R².",output:"Metric comparison"},
    {day:6,title:"Pipeline",task:"Build a scikit-learn preprocessing pipeline.",output:"Reusable pipeline"},
    {day:7,title:"Review",task:"Predict house prices with linear regression.",output:"ML project"}]},
  { week: 6, phase: "ML", title: "Classification", focus: "Predicting categories", days: [
    {day:1,title:"Logistic",task:"Build a logistic regression classifier.",output:"Classifier"},
    {day:2,title:"KNN",task:"Understand distance and nearest neighbors.",output:"KNN notebook"},
    {day:3,title:"Trees",task:"Train and visualize a decision tree.",output:"Decision tree"},
    {day:4,title:"Random Forest",task:"Learn ensemble voting and feature importance.",output:"Random Forest model"},
    {day:5,title:"Metrics",task:"Use accuracy, precision, recall, F1 and confusion matrix.",output:"Evaluation report"},
    {day:6,title:"Tuning",task:"Try cross-validation and basic hyperparameter tuning.",output:"Tuned model"},
    {day:7,title:"Review",task:"Build an email spam classifier.",output:"ML project"}]},
  { week: 7, phase: "ML", title: "Unsupervised Learning", focus: "Finding patterns without labels", days: [
    {day:1,title:"Clustering",task:"Understand K-Means and cluster centers.",output:"K-Means notebook"},
    {day:2,title:"Choosing K",task:"Use elbow method and silhouette score.",output:"Cluster analysis"},
    {day:3,title:"DBSCAN",task:"Explore density-based clustering.",output:"DBSCAN notebook"},
    {day:4,title:"PCA",task:"Learn dimensionality reduction and variance.",output:"PCA notebook"},
    {day:5,title:"Features",task:"Practice scaling and feature engineering.",output:"Feature pipeline"},
    {day:6,title:"Case study",task:"Segment customers from a real dataset.",output:"Segmentation report"},
    {day:7,title:"Review",task:"Publish customer segmentation project.",output:"Portfolio project"}]},
  { week: 8, phase: "ML", title: "Advanced ML", focus: "Boosting and model selection", days: [
    {day:1,title:"Boosting",task:"Understand gradient boosting.",output:"Boosting notes"},
    {day:2,title:"XGBoost",task:"Train and evaluate an XGBoost-style model.",output:"Boosted model"},
    {day:3,title:"Bias/variance",task:"Diagnose overfitting and underfitting.",output:"Model comparison"},
    {day:4,title:"Feature selection",task:"Compare useful and noisy features.",output:"Feature selection notebook"},
    {day:5,title:"Pipelines",task:"Build an end-to-end sklearn pipeline.",output:"Production-style pipeline"},
    {day:6,title:"Model explainability",task:"Inspect feature importance and errors.",output:"Error analysis"},
    {day:7,title:"Review",task:"Build a customer churn prediction project.",output:"ML project"}]},
  { week: 9, phase: "Deep Learning", title: "Neural Networks", focus: "Neurons, backpropagation and PyTorch", days: [
    {day:1,title:"Neurons",task:"Understand layers, weights and activation functions.",output:"Neural net notes"},
    {day:2,title:"Loss",task:"Learn loss functions and gradient descent.",output:"Gradient demo"},
    {day:3,title:"PyTorch",task:"Create tensors, datasets and a training loop.",output:"PyTorch notebook"},
    {day:4,title:"Training",task:"Train a small neural network.",output:"Trained model"},
    {day:5,title:"Validation",task:"Track training vs validation loss.",output:"Learning curves"},
    {day:6,title:"Regularization",task:"Learn dropout, weight decay and early stopping.",output:"Regularized model"},
    {day:7,title:"Review",task:"Build a handwritten digit classifier.",output:"Deep learning project"}]},
  { week: 10, phase: "Deep Learning", title: "Computer Vision", focus: "CNNs and image classification", days: [
    {day:1,title:"Images",task:"Learn image tensors, channels and normalization.",output:"Image notebook"},
    {day:2,title:"CNNs",task:"Understand convolution, pooling and receptive fields.",output:"CNN notes"},
    {day:3,title:"Augmentation",task:"Apply image augmentation safely.",output:"Augmentation pipeline"},
    {day:4,title:"Transfer learning",task:"Use a pretrained vision model.",output:"Transfer model"},
    {day:5,title:"Evaluation",task:"Inspect confusion matrix and misclassified images.",output:"Error report"},
    {day:6,title:"Practice",task:"Train a cat vs dog or similar classifier.",output:"Vision project"},
    {day:7,title:"Review",task:"Publish the computer vision project.",output:"Portfolio project"}]},
  { week: 11, phase: "NLP", title: "Natural Language Processing", focus: "Text preprocessing and classification", days: [
    {day:1,title:"Text basics",task:"Tokenization, normalization and stop words.",output:"NLP notebook"},
    {day:2,title:"Stemming",task:"Compare stemming and lemmatization.",output:"Text preprocessing"},
    {day:3,title:"TF-IDF",task:"Convert documents into useful numerical features.",output:"TF-IDF model"},
    {day:4,title:"Classification",task:"Build a text classifier.",output:"Text classifier"},
    {day:5,title:"Sentiment",task:"Create a sentiment analysis pipeline.",output:"Sentiment model"},
    {day:6,title:"Embeddings",task:"Understand word and sentence embeddings.",output:"Embedding notes"},
    {day:7,title:"Review",task:"Build a sentiment analyzer and document results.",output:"NLP project"}]},
  { week: 12, phase: "GenAI", title: "Transformers + LLMs", focus: "Attention, tokens and modern AI", days: [
    {day:1,title:"Tokens",task:"Understand tokenization and context windows.",output:"LLM notes"},
    {day:2,title:"Attention",task:"Learn self-attention conceptually.",output:"Attention diagram"},
    {day:3,title:"Transformers",task:"Understand encoder/decoder architecture.",output:"Transformer notes"},
    {day:4,title:"LLMs",task:"Learn how modern language models are trained and used.",output:"LLM study notes"},
    {day:5,title:"Prompting",task:"Practice structured prompts and evaluation.",output:"Prompt library"},
    {day:6,title:"Embeddings",task:"Create embeddings and compare semantic similarity.",output:"Embedding demo"},
    {day:7,title:"Review",task:"Build a small AI assistant prototype.",output:"GenAI project"}]},
  { week: 13, phase: "GenAI", title: "RAG Applications", focus: "Retrieval augmented generation", days: [
    {day:1,title:"RAG",task:"Understand retrieval, context and generation.",output:"RAG architecture"},
    {day:2,title:"Chunking",task:"Experiment with document chunking strategies.",output:"Chunking notebook"},
    {day:3,title:"Vector search",task:"Learn vector databases and similarity search.",output:"Vector search demo"},
    {day:4,title:"Retriever",task:"Build a basic retrieval pipeline.",output:"Retriever"},
    {day:5,title:"Grounding",task:"Add citations and reduce unsupported answers.",output:"Grounded answers"},
    {day:6,title:"PDF QA",task:"Build question answering over a PDF.",output:"PDF assistant"},
    {day:7,title:"Review",task:"Polish the PDF assistant README and demo.",output:"Portfolio project"}]},
  { week: 14, phase: "Deployment", title: "AI App Development", focus: "APIs, Docker and deployment", days: [
    {day:1,title:"FastAPI",task:"Expose a model through a REST API.",output:"Working API"},
    {day:2,title:"Frontend",task:"Connect a simple web UI to your AI API.",output:"AI web app"},
    {day:3,title:"Docker",task:"Containerize the application.",output:"Docker image"},
    {day:4,title:"Testing",task:"Add basic API and model tests.",output:"Test suite"},
    {day:5,title:"GitHub Actions",task:"Automate build and test on every push.",output:"CI pipeline"},
    {day:6,title:"Cloud",task:"Learn the basics of deploying an AI service.",output:"Deployment notes"},
    {day:7,title:"Review",task:"Deploy one end-to-end AI project.",output:"Live demo"}]},
  { week: 15, phase: "Portfolio", title: "Capstone Project", focus: "Build one complete AI application", days: [
    {day:1,title:"Choose",task:"Select a useful problem and define users, input and output.",output:"Project brief"},
    {day:2,title:"Data",task:"Collect, clean and document your data.",output:"Dataset + README"},
    {day:3,title:"Model",task:"Build and evaluate the first model.",output:"Baseline model"},
    {day:4,title:"App",task:"Connect model to an API and interface.",output:"Working prototype"},
    {day:5,title:"Quality",task:"Add validation, error handling and evaluation.",output:"Quality checklist"},
    {day:6,title:"Deploy",task:"Containerize and deploy your project.",output:"Live application"},
    {day:7,title:"Publish",task:"Write a polished README and portfolio case study.",output:"Capstone project"}]},
  { week: 16, phase: "Career", title: "AI/ML Job Readiness", focus: "Interview, GitHub and portfolio", days: [
    {day:1,title:"ML revision",task:"Revise core algorithms and when to use them.",output:"Cheat sheet"},
    {day:2,title:"Stats revision",task:"Practice common statistics and probability questions.",output:"20 questions"},
    {day:3,title:"Python revision",task:"Solve Python coding problems for data roles.",output:"10 problems"},
    {day:4,title:"ML system design",task:"Sketch an end-to-end ML system.",output:"System diagram"},
    {day:5,title:"Portfolio",task:"Polish your top 3 projects and GitHub profiles.",output:"Portfolio refresh"},
    {day:6,title:"Mock interview",task:"Answer ML, Python and project questions aloud.",output:"Mock interview notes"},
    {day:7,title:"Final review",task:"Review your roadmap, identify gaps and set the next 30-day goal.",output:"Next-step plan"}]}
];

const storageKey = "ai-ml-tracker-v1";

export default function Index() {
  const [week, setWeek] = useState(1);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [dark, setDark] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
      setDone(saved.done || {});
      setDark(saved.dark === undefined ? true : Boolean(saved.dark));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    if (!hydrated) return;
    localStorage.setItem(storageKey, JSON.stringify({ done, dark }));
  }, [done, dark, hydrated]);

  const current = weeks[week - 1];
  const total = weeks.length * 7;
  const completed = Object.values(done).filter(Boolean).length;
  const progress = Math.round((completed / total) * 100);
  const weekCompleted = current.days.filter(d => done[`w${week}d${d.day}`]).length;

  const phaseProgress = useMemo(() => {
    const phases = Array.from(new Set(weeks.map(w => w.phase)));
    return phases.map(phase => {
      const phaseWeeks = weeks.filter(w => w.phase === phase);
      const count = phaseWeeks.flatMap(w => w.days).filter(d => done[`w${phaseWeeks.find(w=>w.days.includes(d))?.week}d${d.day}`]).length;
      return { phase, count, total: phaseWeeks.length * 7 };
    });
  }, [done]);

  const toggle = (key: string) => setDone(prev => ({ ...prev, [key]: !prev[key] }));
  const reset = () => setDone({});

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.brand}><span className={styles.logo}>AI</span><div><strong>AI/ML Daily Tracker</strong><span>Personal learning lab</span></div></div>
        <div className={styles.actions}>
          <Button variant="ghost" size="sm" onClick={() => setDark(!dark)}>{dark ? "☀ Light" : "☾ Dark"}</Button>
          <Button variant="ghost" size="sm" onClick={reset}><RotateCcw size={15}/> Reset</Button>
        </div>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>16-WEEK ROADMAP · BEGINNER → AI BUILDER</p>
          <h1>Build AI skills,<br/><em>one day at a time.</em></h1>
          <p className={styles.sub}>A focused roadmap from Python and data analysis to Machine Learning, Deep Learning, GenAI and deployment.</p>
        </div>
        <div className={styles.progressCard}>
          <div className={styles.progressTop}><span>Overall progress</span><b>{progress}%</b></div>
          <div className={styles.progressTrack}><span style={{width: `${progress}%`}}/></div>
          <div className={styles.progressMeta}><span>{completed} / {total} days completed</span><span>{progress >= 100 ? "Roadmap complete 🎉" : `${total-completed} days left`}</span></div>
        </div>
      </section>

      <section className={styles.stats}>
        <div><Target/><span>Current phase</span><strong>{current.phase}</strong></div>
        <div><Flame/><span>Week streak</span><strong>{weekCompleted}/7 days</strong></div>
        <div><Trophy/><span>Projects</span><strong>{Math.floor(completed/7)} built</strong></div>
      </section>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sideTitle}>ROADMAP</div>
          {weeks.map(w => {
            const c = w.days.filter(d => done[`w${w.week}d${d.day}`]).length;
            return <button key={w.week} className={`${styles.weekButton} ${week===w.week?styles.active:""}`} onClick={() => setWeek(w.week)}>
              <span className={styles.weekNum}>{String(w.week).padStart(2,"0")}</span>
              <span><b>{w.title}</b><small>{w.phase} · {c}/7</small></span>
              {c===7 && <Check size={15}/>}
            </button>
          })}
        </aside>

        <section className={styles.content}>
          <div className={styles.weekHeader}>
            <div><p className={styles.kicker}>WEEK {String(current.week).padStart(2,"0")} · {current.phase}</p><h2>{current.title}</h2><p>{current.focus}</p></div>
            <div className={styles.weekScore}><b>{weekCompleted}/7</b><span>completed</span></div>
          </div>

          <div className={styles.dayGrid}>
            {current.days.map(d => {
              const key = `w${week}d${d.day}`;
              const isDone = Boolean(done[key]);
              return <article key={d.day} className={`${styles.day} ${isDone?styles.dayDone:""}`}>
                <div className={styles.dayTop}><span>DAY {d.day}</span><button className={styles.check} aria-label={isDone ? "Mark incomplete" : "Mark complete"} onClick={() => toggle(key)}>{isDone ? <Check size={17}/> : d.day}</button></div>
                <h3>{d.title}</h3><p>{d.task}</p>
                <div className={styles.output}><span>OUTPUT</span>{d.output}</div>
                <Button size="sm" variant={isDone ? "secondary" : "primary"} onClick={() => toggle(key)}>{isDone ? "Completed" : "Mark complete"}</Button>
              </article>
            })}
          </div>

          <div className={styles.nav}>
            <Button variant="outline" disabled={week===1} onClick={() => setWeek(Math.max(1,week-1))}><ChevronLeft size={16}/> Previous week</Button>
            <span>Week {week} of {weeks.length}</span>
            <Button variant="outline" disabled={week===weeks.length} onClick={() => setWeek(Math.min(weeks.length,week+1))}>Next week <ChevronRight size={16}/></Button>
          </div>

          <section className={styles.phaseSection}>
            <div><p className={styles.kicker}>PROGRESS BY PHASE</p><h2>See the bigger picture</h2></div>
            <div className={styles.phaseGrid}>{phaseProgress.map(p => <div className={styles.phaseCard} key={p.phase}><div><b>{p.phase}</b><span>{p.count}/{p.total}</span></div><div className={styles.miniTrack}><span style={{width:`${Math.round(p.count/p.total*100)}%`}}/></div></div>)}</div>
          </section>
        </section>
      </div>

      <footer className={styles.footer}>Personal AI/ML learning tracker · Progress is saved automatically in this browser.</footer>
    </main>
  );
}
