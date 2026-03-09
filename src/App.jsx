import React, { useState, useRef } from 'react';
import { Download, Plus, Trash2, Link as LinkIcon, ChevronDown, ChevronRight, GripVertical, Upload, Loader2, XCircle } from 'lucide-react';

// --- INITIAL DATA ---
const initialData = {
  personal: {
    name: "AKSHAT GUPTA",
    title: "ML Engineer",
    email: "akshat.gupta_cs.aiml24@gla.ac.in",
    phone: "+91 9105211531",
    address: "Laxmi Nagar Janam Bhoomi Link Road, Mathura 281004",
  },
  socials: [
    { name: "GitHub", url: "#" },
    { name: "Linkedin", url: "#" },
    { name: "LeetCode", url: "#" },
    { name: "HackerRank", url: "#" },
    { name: "CodeForces", url: "#" }
  ],
  education: [
    {
      institution: "GLA UNIVERSITY",
      degree: "Computer Science (AIML) Bachelors",
      score: "CGPA: 9.19",
      location: "Mathura, U.P.",
      date: "August 2024 – July 2028"
    }
  ],
  experience: [
    {
      company: "Skillcred (micro internship)",
      role: "Intern/Learner",
      location: "Remote",
      date: "June – August 2025",
      bullets: [
        "Proficient in utilizing and evaluating a variety of Generative AI tools and platforms.",
        "Demonstrated strong comprehension of the underlying architecture and mechanisms of Large Language Models (LLMs), including transformer networks and model fine-tuning processes.",
        "Spearheaded two distinct Generative AI projects, successfully leading a 4-person cross-functional team from ideation through final delivery."
      ]
    }
  ],
  skills: [
    { category: "Programming Languages", items: "Python, C, HTML, CSS, JS" },
    { category: "Libraries/Frameworks", items: "scikit-learn, pandas, numpy, Flask, matplotlib, seaborn, Django Framework(Basics)" },
    { category: "Tools & Platforms", items: "Git, Git Hub, VS Code, Azure portal, Power BI" },
    { category: "Databases", items: "MySQL" }
  ],
  projects: [
    {
      name: "SarvSaathi (Ongoing)",
      tech: "Python, Django",
      link: "#",
      desc: "A end to end Health Care Management tool (Group project)"
    },
    {
      name: "ML Projects",
      tech: "Jupyter Notebook, Python, Flask, HTML",
      link: "#",
      desc: "Multiple Machine Learning projects."
    },
    {
      name: "Python Projects",
      tech: "Python, CSS, HTML, Flask",
      link: "#",
      desc: "Multiple Python projects from basic to advance."
    },
    {
      name: "Azure-utility",
      tech: "HTML, CSS, Python, Flask",
      link: "#",
      desc: "Integrated most used Azure Al services."
    },
    {
      name: "Sentiment Analysis (xgboost)",
      tech: "Python, Streamlit",
      link: "#",
      desc: "A ML model trained to predict the number of star ratings by reviews."
    }
  ],
  certifications: [
    { name: "Microsoft Certified: Azure Fundamentals", platform: "Microsoft", link: "#" },
    { name: "Machine Learning Specialization", platform: "Coursera | Stanford Online | Deeplearning.AI", link: "#" },
    { name: "Version Control", platform: "Coursera | Meta", link: "#" },
    { name: "Postman API Fundamentals Student Expert", platform: "Postman", link: "#" },
    { name: "The Ultimate Job Ready Data Science Course", platform: "Code With Harry", link: "#" },
    { name: "Complete 2025 Python Bootcamp: Learn Python from Scratch", platform: "Code With Harry", link: "#" }
  ],
  awards: [
    "Won Venturethon 2025 at GLA University, Mathura (2nd position) [Team: Anveshan]"
  ]
};

// --- EDITOR UI COMPONENTS ---
const AccordionHeader = ({ title, isOpen, onToggle }) => (
  <div 
    className="flex justify-between items-center cursor-pointer bg-slate-100 p-3 rounded-md font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
    onClick={onToggle}
  >
    {title}
    {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
  </div>
);

const Input = ({ label, value, onChange, placeholder }) => (
  <div className="mb-3">
    <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">{label}</label>
    <input
      type="text"
      className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

const TextArea = ({ label, value, onChange, placeholder }) => (
  <div className="mb-3">
    <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">{label}</label>
    <textarea
      className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-h-[80px]"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef(null);

  const [openSections, setOpenSections] = useState({
    personal: true,
    socials: false,
    education: false,
    experience: false,
    skills: false,
    projects: false,
    certifications: false,
    awards: false
  });

  const [draggedItem, setDraggedItem] = useState(null);

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleExport = () => {
    window.print();
  };

  const updateData = (section, index, field, value) => {
    setData(prev => {
      const newData = { ...prev };
      if (index !== null) {
        newData[section][index][field] = value;
      } else if (field) {
        newData[section][field] = value;
      } else {
        newData[section][index] = value; 
      }
      return newData;
    });
  };

  const addItem = (section, defaultItem) => {
    setData(prev => ({ ...prev, [section]: [...(prev[section] || []), defaultItem] }));
  };

  const removeItem = (section, index) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  // Drag and Drop
  const handleDragStart = (e, section, index) => {
    setDraggedItem({ section, index });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, section, dropIndex) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.section !== section || draggedItem.index === dropIndex) {
      setDraggedItem(null);
      return;
    }

    setData(prev => {
      const newData = { ...prev };
      const list = [...newData[section]];
      const [movedItem] = list.splice(draggedItem.index, 1);
      list.splice(dropIndex, 0, movedItem);
      newData[section] = list;
      return newData;
    });
    setDraggedItem(null);
  };

  // --- GEMINI API PDF EXTRACTION ---
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Reset UI states
    setErrorMsg("");
    setIsLoading(true);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Data = reader.result.split(',')[1];
        
        // NOTE FOR LOCAL/RENDER DEPLOYMENT:
        // When deploying to Render using Vite, replace the line below with:
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        //const apiKey = ""; 

        const promptText = `Extract the resume data from the attached document. Map the extracted information strictly into a valid JSON object matching this exact schema: \n${JSON.stringify(initialData)}\nEnsure all arrays exist (even if empty) and keys match perfectly. Do not include markdown formatting like \`\`\`json. Return pure JSON.`;

        const payload = {
          contents: [{
            role: "user",
            parts: [
              { text: promptText },
              { inlineData: { mimeType: file.type || "application/pdf", data: base64Data } }
            ]
          }],
          generationConfig: {
            responseMimeType: "application/json"
          }
        };

        // FIXED: Switched to gemini-1.5-flash which is universally available for public API keys
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok && result.candidates?.[0]?.content?.parts?.[0]?.text) {
          try {
            const extractedData = JSON.parse(result.candidates[0].content.parts[0].text);
            
            // Safety check to merge structures and prevent undefined maps
            const mergedData = {
               personal: { ...initialData.personal, ...(extractedData.personal || {}) },
               socials: extractedData.socials || [],
               education: extractedData.education || [],
               experience: extractedData.experience || [],
               skills: extractedData.skills || [],
               projects: extractedData.projects || [],
               certifications: extractedData.certifications || [],
               awards: extractedData.awards || []
            };

            setData(mergedData);
            
            // Open all sections automatically so the user can see the extracted content
            setOpenSections({
              personal: true, socials: true, education: true, experience: true,
              skills: true, projects: true, certifications: true, awards: true
            });

          } catch (parseError) {
            console.error("Failed to parse JSON:", parseError);
            setErrorMsg("Failed to parse the AI response. Please try again.");
          }
        } else {
          console.error("API Error:", result);
          setErrorMsg("Failed to extract data via API. Check console for details.");
        }
        
        setIsLoading(false);
        // Reset file input so the same file can be selected again
        if (fileInputRef.current) fileInputRef.current.value = "";
      };
      
      reader.onerror = () => {
        setErrorMsg("Error reading the file.");
        setIsLoading(false);
      };

    } catch (error) {
      console.error("Error processing file:", error);
      setErrorMsg("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans overflow-hidden print:h-auto print:overflow-visible print:block">
      
      {/* --- PRINT STYLES --- */}
      <style>{`
        @media print {
          @page { size: A4; margin: 15mm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white; }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          .print-container { 
            width: 100% !important; 
            height: auto !important; 
            min-height: auto !important;
            max-width: none !important;
            padding: 0 !important; 
            box-shadow: none !important; 
            margin: 0 !important; 
            overflow: visible !important;
          }
        }
      `}</style>

      {/* --- LEFT PANEL: EDITOR --- */}
      <div className="w-[450px] bg-white border-r border-slate-200 flex flex-col h-full shadow-lg z-10 no-print relative">
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 z-50 flex flex-col justify-center items-center backdrop-blur-sm">
             <Loader2 size={40} className="text-blue-600 animate-spin mb-3" />
             <p className="font-semibold text-slate-700 animate-pulse">Analyzing Document...</p>
             <p className="text-sm text-slate-500 mt-1 text-center px-6">Extracting your details using Gemini AI.</p>
          </div>
        )}

        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-800 text-white flex justify-between items-center shrink-0">
          <div>
            <h1 className="text-lg font-bold">Resume Builder</h1>
            <p className="text-xs text-slate-300">Live preview & editor</p>
          </div>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm font-semibold transition-colors shadow-sm"
          >
            <Download size={16} /> Export PDF
          </button>
        </div>

        {/* AI Upload Action Bar */}
        <div className="p-4 border-b border-slate-200 bg-blue-50 shrink-0">
          <label className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white border-2 border-dashed border-blue-300 text-blue-700 rounded-md cursor-pointer hover:bg-blue-100 transition-colors font-semibold shadow-sm text-sm">
            <Upload size={18} /> Autofill with PDF (Gemini AI)
            <input 
              type="file" 
              accept="application/pdf" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileUpload} 
            />
          </label>
          <p className="text-[11px] text-center text-slate-500 mt-2">Upload an existing resume to automatically parse and fill these fields.</p>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="m-4 mb-0 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md flex items-start gap-2 shrink-0">
            <XCircle size={16} className="mt-0.5 shrink-0" />
            <div className="flex-1 leading-snug">{errorMsg}</div>
            <button onClick={() => setErrorMsg("")} className="shrink-0 text-red-400 hover:text-red-600"><Trash2 size={14}/></button>
          </div>
        )}

        {/* Scrollable Form */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
          
          {/* Personal Info */}
          <div className="space-y-2">
            <AccordionHeader title="Personal Information" isOpen={openSections.personal} onToggle={() => toggleSection('personal')} />
            {openSections.personal && (
              <div className="p-3 border border-slate-100 rounded-md bg-white">
                <Input label="Full Name" value={data.personal.name} onChange={(v) => updateData('personal', null, 'name', v)} />
                <Input label="Title/Role" value={data.personal.title} onChange={(v) => updateData('personal', null, 'title', v)} />
                <Input label="Email" value={data.personal.email} onChange={(v) => updateData('personal', null, 'email', v)} />
                <Input label="Phone" value={data.personal.phone} onChange={(v) => updateData('personal', null, 'phone', v)} />
                <Input label="Location / Address" value={data.personal.address} onChange={(v) => updateData('personal', null, 'address', v)} />
              </div>
            )}
          </div>

          {/* Social Links */}
          <div className="space-y-2">
            <AccordionHeader title="Links & Socials" isOpen={openSections.socials} onToggle={() => toggleSection('socials')} />
            {openSections.socials && (
              <div className="space-y-3">
                {data.socials?.map((link, i) => (
                  <div key={i} className="p-3 border border-slate-200 rounded-md bg-white relative group">
                    <button onClick={() => removeItem('socials', i)} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>
                    <div className="grid grid-cols-2 gap-2">
                      <Input label="Platform Name" value={link.name} onChange={(v) => updateData('socials', i, 'name', v)} />
                      <Input label="URL" value={link.url} onChange={(v) => updateData('socials', i, 'url', v)} />
                    </div>
                  </div>
                ))}
                <button onClick={() => addItem('socials', {name: 'New Link', url: ''})} className="w-full py-2 border-2 border-dashed border-slate-300 text-slate-500 rounded flex justify-center items-center gap-2 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-300 transition-colors text-sm font-semibold"><Plus size={16}/> Add Link</button>
              </div>
            )}
          </div>

          {/* Education */}
          <div className="space-y-2">
            <AccordionHeader title="Education" isOpen={openSections.education} onToggle={() => toggleSection('education')} />
            {openSections.education && (
              <div className="space-y-3">
                {data.education?.map((edu, i) => (
                  <div key={i} className="p-3 border border-slate-200 rounded-md bg-white relative group">
                    <button onClick={() => removeItem('education', i)} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>
                    <Input label="Institution" value={edu.institution} onChange={(v) => updateData('education', i, 'institution', v)} />
                    <Input label="Degree / Program" value={edu.degree} onChange={(v) => updateData('education', i, 'degree', v)} />
                    <div className="grid grid-cols-2 gap-2">
                      <Input label="Score (CGPA/%)" value={edu.score} onChange={(v) => updateData('education', i, 'score', v)} />
                      <Input label="Location" value={edu.location} onChange={(v) => updateData('education', i, 'location', v)} />
                    </div>
                    <Input label="Date (e.g., Aug 2024 - Jul 2028)" value={edu.date} onChange={(v) => updateData('education', i, 'date', v)} />
                  </div>
                ))}
                <button onClick={() => addItem('education', {institution: '', degree: '', score: '', location: '', date: ''})} className="w-full py-2 border-2 border-dashed border-slate-300 text-slate-500 rounded flex justify-center items-center gap-2 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-300 transition-colors text-sm font-semibold"><Plus size={16}/> Add Education</button>
              </div>
            )}
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <AccordionHeader title="Experience" isOpen={openSections.experience} onToggle={() => toggleSection('experience')} />
            {openSections.experience && (
              <div className="space-y-3">
                {data.experience?.map((exp, i) => (
                  <div key={i} className="p-3 border border-slate-200 rounded-md bg-white relative group">
                    <button onClick={() => removeItem('experience', i)} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>
                    <Input label="Company / Organization" value={exp.company} onChange={(v) => updateData('experience', i, 'company', v)} />
                    <Input label="Role / Title" value={exp.role} onChange={(v) => updateData('experience', i, 'role', v)} />
                    <div className="grid grid-cols-2 gap-2">
                      <Input label="Location" value={exp.location} onChange={(v) => updateData('experience', i, 'location', v)} />
                      <Input label="Date" value={exp.date} onChange={(v) => updateData('experience', i, 'date', v)} />
                    </div>
                    <TextArea 
                      label="Bullets (One per line)" 
                      value={(exp.bullets || []).join('\n')} 
                      onChange={(v) => updateData('experience', i, 'bullets', v.split('\n'))} 
                    />
                  </div>
                ))}
                <button onClick={() => addItem('experience', {company: '', role: '', location: '', date: '', bullets: []})} className="w-full py-2 border-2 border-dashed border-slate-300 text-slate-500 rounded flex justify-center items-center gap-2 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-300 transition-colors text-sm font-semibold"><Plus size={16}/> Add Experience</button>
              </div>
            )}
          </div>

          {/* Projects */}
          <div className="space-y-2">
            <AccordionHeader title="Projects" isOpen={openSections.projects} onToggle={() => toggleSection('projects')} />
            {openSections.projects && (
              <div className="space-y-3">
                {data.projects?.map((proj, i) => (
                  <div 
                    key={i} 
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'projects', i)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'projects', i)}
                    className={`p-3 border border-slate-200 rounded-md bg-white relative group cursor-move transition-opacity ${draggedItem?.section === 'projects' && draggedItem?.index === i ? 'opacity-40' : 'opacity-100'}`}
                  >
                    <div className="absolute top-2 left-1 text-slate-300 group-hover:text-slate-500 transition-colors">
                      <GripVertical size={18}/>
                    </div>
                    <button onClick={() => removeItem('projects', i)} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"><Trash2 size={16}/></button>
                    
                    <div className="ml-6">
                      <Input label="Project Name" value={proj.name} onChange={(v) => updateData('projects', i, 'name', v)} />
                      <Input label="Link URL" value={proj.link} onChange={(v) => updateData('projects', i, 'link', v)} />
                      <Input label="Technologies Used" value={proj.tech} onChange={(v) => updateData('projects', i, 'tech', v)} />
                      <TextArea label="Description" value={proj.desc} onChange={(v) => updateData('projects', i, 'desc', v)} />
                    </div>
                  </div>
                ))}
                <button onClick={() => addItem('projects', {name: '', tech: '', link: '', desc: ''})} className="w-full py-2 border-2 border-dashed border-slate-300 text-slate-500 rounded flex justify-center items-center gap-2 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-300 transition-colors text-sm font-semibold"><Plus size={16}/> Add Project</button>
              </div>
            )}
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <AccordionHeader title="Skills" isOpen={openSections.skills} onToggle={() => toggleSection('skills')} />
            {openSections.skills && (
              <div className="space-y-3">
                {data.skills?.map((skill, i) => (
                  <div key={i} className="p-3 border border-slate-200 rounded-md bg-white relative group">
                    <button onClick={() => removeItem('skills', i)} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>
                    <Input label="Category (e.g. Languages)" value={skill.category} onChange={(v) => updateData('skills', i, 'category', v)} />
                    <TextArea label="Skills (Comma separated)" value={skill.items} onChange={(v) => updateData('skills', i, 'items', v)} />
                  </div>
                ))}
                <button onClick={() => addItem('skills', {category: '', items: ''})} className="w-full py-2 border-2 border-dashed border-slate-300 text-slate-500 rounded flex justify-center items-center gap-2 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-300 transition-colors text-sm font-semibold"><Plus size={16}/> Add Skill Category</button>
              </div>
            )}
          </div>

          {/* Certifications */}
          <div className="space-y-2">
            <AccordionHeader title="Certifications" isOpen={openSections.certifications} onToggle={() => toggleSection('certifications')} />
            {openSections.certifications && (
              <div className="space-y-3">
                {data.certifications?.map((cert, i) => (
                  <div 
                    key={i} 
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'certifications', i)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'certifications', i)}
                    className={`p-3 border border-slate-200 rounded-md bg-white relative group cursor-move transition-opacity ${draggedItem?.section === 'certifications' && draggedItem?.index === i ? 'opacity-40' : 'opacity-100'}`}
                  >
                    <div className="absolute top-2 left-1 text-slate-300 group-hover:text-slate-500 transition-colors">
                      <GripVertical size={18}/>
                    </div>
                    <button onClick={() => removeItem('certifications', i)} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"><Trash2 size={16}/></button>
                    
                    <div className="ml-6 space-y-1">
                      <Input label="Certification Name" value={cert.name} onChange={(v) => updateData('certifications', i, 'name', v)} />
                      <div className="grid grid-cols-2 gap-2">
                        <Input label="Platform" value={cert.platform} onChange={(v) => updateData('certifications', i, 'platform', v)} />
                        <Input label="URL/Link" value={cert.link} onChange={(v) => updateData('certifications', i, 'link', v)} />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => addItem('certifications', {name: '', platform: '', link: ''})} className="w-full py-2 border-2 border-dashed border-slate-300 text-slate-500 rounded flex justify-center items-center gap-2 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-300 transition-colors text-sm font-semibold"><Plus size={16}/> Add Certification</button>
              </div>
            )}
          </div>

          {/* Awards */}
          <div className="space-y-2">
            <AccordionHeader title="Honors & Awards" isOpen={openSections.awards} onToggle={() => toggleSection('awards')} />
            {openSections.awards && (
              <div className="space-y-3">
                {data.awards?.map((award, i) => (
                  <div key={i} className="relative group">
                     <button onClick={() => removeItem('awards', i)} className="absolute right-2 top-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>
                    <input className="w-full border border-slate-300 rounded px-3 py-2 text-sm pr-8" value={award || ""} onChange={(e) => updateData('awards', i, null, e.target.value)} />
                  </div>
                ))}
                <button onClick={() => addItem('awards', '')} className="w-full py-2 border-2 border-dashed border-slate-300 text-slate-500 rounded flex justify-center items-center gap-2 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-300 transition-colors text-sm font-semibold"><Plus size={16}/> Add Award</button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* --- RIGHT PANEL: LIVE PREVIEW --- */}
      <div className="flex-1 overflow-y-auto bg-slate-300 p-8 flex justify-center print:p-0 print:bg-white print:overflow-visible print:block">
        
        {/* The Actual A4 Paper Resume */}
        <div className="bg-white shadow-2xl w-full max-w-[210mm] min-h-[297mm] h-max p-[20mm] print-container text-gray-900 mx-auto box-border" style={{fontFamily: "'Times New Roman', Times, serif"}}>
          
          {/* HEADER */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold uppercase tracking-wide text-black mb-1">{data.personal.name}</h1>
            <h2 className="text-md font-semibold text-gray-800 mb-2">{data.personal.title}</h2>
            
            <div className="text-[11pt] text-gray-700 flex flex-wrap justify-center items-center gap-x-2 mb-1">
              {data.personal.email && <span>{data.personal.email}</span>}
              {(data.personal.email && data.personal.phone) && <span className="text-gray-400">|</span>}
              {data.personal.phone && <span>{data.personal.phone}</span>}
            </div>
            {data.personal.address && <div className="text-[10pt] text-gray-600 mb-1">{data.personal.address}</div>}

            <div className="text-[10.5pt] flex flex-wrap justify-center items-center gap-x-2 mt-2">
              {data.socials?.map((link, i) => (link.name &&
                <React.Fragment key={i}>
                  <a href={link.url} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">{link.name}</a>
                  {i < data.socials.length - 1 && <span className="text-gray-400">|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* EDUCATION */}
          {data.education && data.education.length > 0 && (
            <div className="mb-4">
              <h3 className="text-[12pt] font-bold uppercase border-b-[1.5px] border-black pb-1 mb-3">Education</h3>
              <div className="space-y-3">
                {data.education.map((edu, i) => (
                  <div key={i} className="text-[11pt]">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-bold text-black uppercase">{edu.institution}</span>
                      <span className="text-black">{edu.location}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="italic">{edu.degree} {edu.score && `• ${edu.score}`}</span>
                      <span>{edu.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EXPERIENCE */}
          {data.experience && data.experience.length > 0 && (
            <div className="mb-4">
              <h3 className="text-[12pt] font-bold uppercase border-b-[1.5px] border-black pb-1 mb-3">Experience</h3>
              <div className="space-y-4">
                {data.experience.map((exp, i) => (
                  <div key={i} className="text-[11pt]">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-bold text-black">{exp.company}</span>
                      <span className="text-black">{exp.location}</span>
                    </div>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="italic">{exp.role}</span>
                      <span>{exp.date}</span>
                    </div>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="list-disc list-outside ml-5 space-y-1 mt-1 text-[10.5pt] text-justify">
                        {exp.bullets.filter(b => b.trim()).map((bullet, j) => (
                          <li key={j}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SKILLS */}
          {data.skills && data.skills.length > 0 && (
            <div className="mb-4">
              <h3 className="text-[12pt] font-bold uppercase border-b-[1.5px] border-black pb-1 mb-3">Skills</h3>
              <div className="text-[11pt] space-y-1">
                {data.skills.map((skill, i) => (
                  <div key={i} className="leading-snug">
                    <span className="font-bold text-black">{skill.category}: </span>
                    <span>{skill.items}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROJECTS */}
          {data.projects && data.projects.length > 0 && (
            <div className="mb-4">
              <h3 className="text-[12pt] font-bold uppercase border-b-[1.5px] border-black pb-1 mb-3">Projects / Open-Source</h3>
              <div className="space-y-3">
                {data.projects.map((proj, i) => (
                  <div key={i} className="text-[11pt] leading-snug">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <div className="font-bold text-black">
                        {proj.name} 
                        {proj.link && proj.link !== '#' && (
                           <span> | <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-700 font-normal hover:underline text-[10pt]">Link</a></span>
                        )}
                      </div>
                      {proj.tech && <div className="italic text-[10.5pt] ml-4 text-right shrink-0">{proj.tech}</div>}
                    </div>
                    {proj.desc && <div className="text-[10.5pt]">{proj.desc}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CERTIFICATIONS */}
          {data.certifications && data.certifications.length > 0 && (
            <div className="mb-4">
              <h3 className="text-[12pt] font-bold uppercase border-b-[1.5px] border-black pb-1 mb-3">Certifications</h3>
              <ul className="list-disc list-outside ml-5 space-y-1 text-[11pt]">
                {data.certifications.filter(c => c.name?.trim() || c.platform?.trim()).map((cert, i) => (
                  <li key={i}>
                    {cert.name}
                    {cert.platform && (
                      <span> - {cert.link && cert.link !== '#' ? (
                        <a href={cert.link} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">{cert.platform}</a>
                      ) : (
                        cert.platform
                      )}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* HONORS & AWARDS */}
          {data.awards && data.awards.length > 0 && (
            <div className="mb-4">
              <h3 className="text-[12pt] font-bold uppercase border-b-[1.5px] border-black pb-1 mb-3">Honors & Awards</h3>
              <ul className="list-disc list-outside ml-5 space-y-1 text-[11pt]">
                {data.awards.filter(a => a?.trim()).map((award, i) => (
                  <li key={i}>{award}</li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}