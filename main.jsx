import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import "./styles.css";

const days = [
  { day: "Mon", focus: "Stamina", activity: "Brisk Walk + Mobility", duration: 30, note: "Keep a comfortable pace and recover with light stretching." },
  { day: "Tue", focus: "Strength", activity: "Bodyweight Basics", duration: 25, note: "Use controlled movement and stop if you feel pain." },
  { day: "Wed", focus: "Recovery", activity: "Easy Walk + Stretch", duration: 20, note: "Keep this session light and focus on recovery." },
  { day: "Thu", focus: "Stamina", activity: "Interval Walking", duration: 30, note: "Alternate comfortable and brisk periods." },
  { day: "Fri", focus: "Strength", activity: "Core + Bodyweight", duration: 25, note: "Prioritize good form over repetitions." },
  { day: "Sat", focus: "Activity", activity: "Preferred Activity", duration: 35, note: "Choose a safe activity you enjoy." },
  { day: "Sun", focus: "Recovery", activity: "Rest + Gentle Mobility", duration: 15, note: "Take a recovery day and stay hydrated." }
];

function App() {
  const [page, setPage] = useState("home");
  const backgrounds = {
    home: "/bg1.jpg",
    dashboard: "/bg2.jpg",
    plan: "/bg3.jpg",
    progress: "/bg4.jpg",
    assistant: "/bg5.jpg",
    profile: "/bg6.jpg",
  };
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    experience: "Beginner",
    goal: "General fitness",
    time: "30",
    equipment: "None",
    preferred: "Walking"
  });
  const [completed, setCompleted] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [chat, setChat] = useState([
    { role: "ai", text: "Hi! I’m FitBuddy AI. Ask me about your general wellness plan." }
  ]);
  const [message, setMessage] = useState("");

  const progressData = useMemo(() => days.map((d, i) => ({
    day: d.day,
    minutes: completed.includes(i) ? d.duration : 0
  })), [completed]);

  const completion = Math.round((completed.length / days.length) * 100);

  const toggleActivity = (i) => {
    setCompleted(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  const startPlan = () => {
    setPage("profile");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveProfile = (e) => {
    e.preventDefault();
    setPage("dashboard");
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const userMsg = message.trim();
    setChat(prev => [...prev, { role: "user", text: userMsg }, {
      role: "ai",
      text: "For general wellness, keep the activity comfortable, allow recovery, and adapt the plan to your available time and equipment."
    }]);
    setMessage("");
  };
  return (
    <div 
      className="app"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${backgrounds[page]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh"
      }}
    >
      <header className="nav">
        <button className="brand" onClick={() => setPage("home")}>
          <span className="logo">F</span>
          <span>Fit<span>Buddy</span></span>
        </button>
        <nav>
          {[
            ["home", "Home"],
            ["dashboard", "Dashboard"],
            ["plan", "7-Day Plan"],
            ["progress", "Progress"],
            ["assistant", "AI Assistant"]
          ].map(([id, label]) => (
            <button key={id} className={page === id ? "active" : ""} onClick={() => setPage(id)}>{label}</button>
          ))}
        </nav>
        <button className="navCta" onClick={startPlan}>Create Plan</button>
      </header>

      <main>
        {page === "home" && (
          <section className="hero page">
            <div className="heroCopy">
              <div className="eyebrow">AI-POWERED FITNESS & WELLNESS</div>
              <h1>Your routine.<br/><em>Made personal.</em></h1>
              <p>FitBuddy uses your goals, experience, available time, equipment, and preferred activities to create a practical seven-day wellness plan.</p>
              <div className="heroButtons">
                <button className="primary" onClick={startPlan}>Create My Plan →</button>
                <button className="secondary" onClick={() => setPage("plan")}>Explore Sample Plan</button>
              </div>
              <div className="trust">
                <span>✓ Personalized</span><span>✓ 7-day schedule</span><span>✓ Progress tracking</span>
              </div>
            </div>
            <div className="heroVisual">
              <div className="orb orb1"></div><div className="orb orb2"></div>
              <div className="fitnessCard">
                <div className="miniTop"><span>THIS WEEK</span><b>AI PLAN</b></div>
                <div className="ring"><strong>{completion}%</strong><small>complete</small></div>
                <div className="stats"><div><b>7</b><span>Days</span></div><div><b>{completed.reduce((s,i)=>s+days[i].duration,0)}</b><span>Minutes</span></div><div><b>{completed.length}</b><span>Done</span></div></div>
              </div>
              <div className="floatingTag">✦ Gemini-powered planning</div>
            </div>
          </section>
        )}

        {page === "profile" && (
          <section className="page narrow">
            <div className="sectionHead"><div className="eyebrow">STEP 1 · YOUR PROFILE</div><h2>Tell FitBuddy about you.</h2><p>Your answers shape the generated seven-day activity plan.</p></div>
            <form className="formCard" onSubmit={saveProfile}>
              <div className="grid2">
                <label>Name<input value={profile.name} onChange={e=>setProfile({...profile,name:e.target.value})} placeholder="Your name" required /></label>
                <label>Age<input type="number" min="13" max="100" value={profile.age} onChange={e=>setProfile({...profile,age:e.target.value})} placeholder="Age" required /></label>
                <label>Experience<select value={profile.experience} onChange={e=>setProfile({...profile,experience:e.target.value})}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label>
                <label>General goal<select value={profile.goal} onChange={e=>setProfile({...profile,goal:e.target.value})}><option>General fitness</option><option>Improve stamina</option><option>Stay active</option><option>Build consistency</option></select></label>
                <label>Available time (minutes)<input type="number" value={profile.time} onChange={e=>setProfile({...profile,time:e.target.value})} min="10" max="180" /></label>
                <label>Equipment<select value={profile.equipment} onChange={e=>setProfile({...profile,equipment:e.target.value})}><option>None</option><option>Basic home equipment</option><option>Gym equipment</option></select></label>
              </div>
              <label>Preferred activity<input value={profile.preferred} onChange={e=>setProfile({...profile,preferred:e.target.value})} placeholder="Walking, cycling, yoga..." /></label>
              <div className="safety">FitBuddy is for general wellness and activity planning. It does not replace medical advice, diagnosis, treatment, emergency care, or professional supervision.</div>
              <button className="primary wide">Generate My 7-Day Plan ✦</button>
            </form>
          </section>
        )}

        {page === "dashboard" && (
          <section className="page">
            <div className="dashboardTop"><div><div className="eyebrow">WELCOME BACK</div><h2>{profile.name || "Fitness Friend"}’s dashboard</h2><p>Your plan adapts around your goals and feedback.</p></div><button className="primary" onClick={()=>setPage("plan")}>View Plan →</button></div>
            <div className="metricGrid">
              <div className="metric"><span>Weekly completion</span><b>{completion}%</b><small>Based on activities marked complete</small></div>
              <div className="metric"><span>Active minutes</span><b>{completed.reduce((s,i)=>s+days[i].duration,0)}</b><small>This week</small></div>
              <div className="metric"><span>Activities done</span><b>{completed.length}/7</b><small>Keep building consistency</small></div>
            </div>
            <div className="contentGrid">
              <div className="panel">
                <div className="panelHead"><h3>Today’s activity</h3><span className="pill">{days[0].focus}</span></div>
                <div className="today"><div className="activityIcon">◒</div><div><h3>{days[0].activity}</h3><p>{days[0].duration} minutes · {days[0].note}</p></div><button onClick={()=>toggleActivity(0)} className={completed.includes(0)?"done":"primary"}>{completed.includes(0)?"✓ Done":"Complete"}</button></div>
              </div>
              <div className="panel quote"><div className="quoteMark">“</div><h3>Small steps, consistent days.</h3><p>Use your feedback to help FitBuddy adapt future recommendations.</p></div>
            </div>
          </section>
        )}

        {page === "plan" && (
          <section className="page">
            <div className="sectionHead"><div className="eyebrow">YOUR AI-GENERATED SCHEDULE</div><h2>Seven days, one simple plan.</h2><p>Designed around {profile.time} minutes, {profile.experience.toLowerCase()} experience, and your preferred activity.</p></div>
            <div className="planGrid">{days.map((d,i)=><article className={"dayCard "+(completed.includes(i)?"isDone":"")} key={d.day}>
              <div className="dayNo">0{i+1}</div><div className="dayInfo"><span>{d.day} · {d.focus}</span><h3>{d.activity}</h3><p>{d.duration} min</p><small>{d.note}</small></div>
              <button onClick={()=>toggleActivity(i)} className={completed.includes(i)?"done":"outline"}>{completed.includes(i)?"✓ Completed":"Mark complete"}</button>
            </article>)}</div>
          </section>
        )}

        {page === "progress" && (
          <section className="page">
            <div className="sectionHead"><div className="eyebrow">PROGRESS ANALYTICS</div><h2>See your week at a glance.</h2><p>Completion and active minutes are calculated from your activity history.</p></div>
            <div className="chartPanel"><ResponsiveContainer width="100%" height={320}><BarChart data={progressData}><XAxis dataKey="day"/><YAxis/><Tooltip/><Bar dataKey="minutes" name="Active minutes" radius={[8,8,0,0]}/></BarChart></ResponsiveContainer></div>
            <div className="metricGrid"><div className="metric"><span>Completed</span><b>{completed.length}</b><small>of 7 planned activities</small></div><div className="metric"><span>Pending</span><b>{7-completed.length}</b><small>Activities remaining</small></div><div className="metric"><span>Active minutes</span><b>{completed.reduce((s,i)=>s+days[i].duration,0)}</b><small>Total completed time</small></div></div>
            <div className="feedback panel"><h3>Help adapt your next plan</h3><textarea value={feedback} onChange={e=>setFeedback(e.target.value)} placeholder="Tell FitBuddy about time, difficulty, equipment changes, or what you enjoyed..."></textarea><button className="primary" onClick={()=>setFeedback("Thanks! Your feedback is ready to be sent to the adaptive planning service.")}>Submit feedback & adapt plan</button></div>
          </section>
        )}

        {page === "assistant" && (
          <section className="page narrow">
            <div className="sectionHead"><div className="eyebrow">FITBUDDY AI ASSISTANT</div><h2>Ask your wellness companion.</h2><p>General wellness planning questions, in a simple chat interface.</p></div>
            <div className="chat panel">{chat.map((m,i)=><div key={i} className={"bubble "+m.role}>{m.text}</div>)}<form onSubmit={sendChat} className="chatForm"><input value={message} onChange={e=>setMessage(e.target.value)} placeholder="Ask about your plan..." /><button className="primary">Send</button></form></div>
            <div className="safety">Safety boundary: FitBuddy is not a medical diagnosis or treatment service. For medical concerns, seek appropriate professional advice.</div>
          </section>
        )}
      </main>

      <footer><div><b>Fit<span>Buddy</span></b><p>AI-powered fitness & wellness planning.</p></div><div><span>React · FastAPI · SQLite · Gemini</span><small>Academic project · 2026–2027</small></div></footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
