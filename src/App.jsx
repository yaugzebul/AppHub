import React, { useState, useEffect } from "react";
import {
  LayoutGrid,
  PenTool,
  Key,
  BookOpen,
  ExternalLink,
  Plus,
  Trash2,
  Calendar,
  CheckCircle2,
  Clock,
  User,
} from "lucide-react";

const App = () => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("fabrique-notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    localStorage.setItem("fabrique-notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!newNote.trim()) return;
    setNotes([{ id: Date.now(), text: newNote, completed: false }, ...notes]);
    setNewNote("");
  };

  const toggleNote = (id) => {
    setNotes(
      notes.map((n) => (n.id === id ? { ...n, completed: !n.completed } : n)),
    );
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const tools = [
    {
      name: "SoWeSign",
      desc: "Émargement",
      icon: <PenTool className="text-blue-500" />,
      url: "https://app.sowesign.com/",
      color: "bg-blue-50",
    },
    {
      name: "Welcomr",
      desc: "Accès Portes",
      icon: <Key className="text-orange-500" />,
      url: "https://app.welcomr.fr/",
      color: "bg-orange-50",
    },
    {
      name: "NetYpareo",
      desc: "Planning",
      icon: <BookOpen className="text-emerald-500" />,
      url: "https://portail.campus-centre.fr/",
      color: "bg-emerald-50",
    },
    {
      name: "Docapost",
      desc: "Salaires",
      icon: <Calendar className="text-red-500" />,
      url: "https://remufp.regioncentre-valdeloire.fr/",
      color: "bg-red-50",
    },
    {
      name: "Portfolio",
      desc: "Mes projets",
      icon: <LayoutGrid className="text-purple-500" />,
      url: "https://mon-portfolio.rtestaert.fr/",
      color: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-32">
      {/* Header Style "Glassmorphism" */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30 p-5">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Fabrique<span className="text-blue-600">Hub</span>
            </h1>
            <p className="text-[11px] text-slate-400 flex items-center gap-1.5 uppercase font-bold tracking-wider mt-0.5">
              <Clock size={12} className="text-blue-500" />
              {new Date().toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "short",
              })}
            </p>
          </div>
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-200 ring-4 ring-white">
            RT
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-5 space-y-8">
        {/* Grille des Outils style Bento */}
        <section>
          <div className="flex items-center justify-between mb-5 px-1">
            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Outils de formation
            </h2>
            <span className="h-px flex-1 bg-slate-100 ml-4"></span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {tools.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${tool.color} p-5 rounded-[2rem] border border-white shadow-sm hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 flex flex-col items-start gap-4 group relative overflow-hidden`}
              >
                <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  {tool.icon}
                </div>
                <div className="text-left">
                  <div className="font-bold text-[15px] flex items-center gap-1.5 text-slate-800">
                    {tool.name}
                    <ExternalLink
                      size={12}
                      className="opacity-0 group-hover:opacity-100 group-hover:text-blue-500 transition-all"
                    />
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                    {tool.desc}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Section Notes plus douce */}
        <section className="bg-white rounded-[2.5rem] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <CheckCircle2 size={80} className="text-blue-900" />
          </div>

          <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-800">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <CheckCircle2 className="text-blue-600" size={20} />
            </div>
            Notes de cours
          </h2>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
            {notes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-300 text-sm font-medium italic">
                  Votre espace est vide...
                </p>
              </div>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                    note.completed
                      ? "bg-slate-50 border-transparent opacity-50 scale-[0.98]"
                      : "bg-white border-slate-100 shadow-sm hover:border-blue-100"
                  }`}
                >
                  <div
                    className="flex items-center gap-4 flex-1 cursor-pointer"
                    onClick={() => toggleNote(note.id)}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        note.completed
                          ? "bg-emerald-500 border-emerald-500 shadow-md shadow-emerald-100"
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      {note.completed && (
                        <CheckCircle2 size={14} className="text-white" />
                      )}
                    </div>
                    <span
                      className={`text-[14px] text-left transition-all ${note.completed ? "line-through text-slate-400" : "text-slate-700 font-semibold"}`}
                    >
                      {note.text}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-slate-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Navigation Mobile modernisée */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/90 backdrop-blur-xl border border-white/20 p-2 flex justify-around items-center rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-40">
        <button className="p-4 text-blue-600 bg-blue-50 rounded-[1.8rem] flex flex-col items-center gap-1">
          <LayoutGrid size={22} />
        </button>
        <button className="p-4 text-slate-400 hover:text-slate-600 transition-colors flex flex-col items-center gap-1">
          <Calendar size={22} />
        </button>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-200 active:scale-90 transition-transform cursor-pointer border-4 border-white z-50 -mt-10"
        >
          <Plus size={28} />
        </button>
        <button className="p-4 text-slate-400 hover:text-slate-600 transition-colors flex flex-col items-center gap-1">
          <Clock size={22} />
        </button>
        <button className="p-4 text-slate-400 hover:text-slate-600 transition-colors flex flex-col items-center gap-1">
          <User size={22} />
        </button>
      </nav>
      {/* Fenêtre de saisie rapide (Modale) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-24 sm:pb-32 bg-slate-900/40 backdrop-blur-sm transition-all">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800">Nouvelle note</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                Annuler
              </button>
            </div>

            <div className="flex gap-2">
              <input
                autoFocus
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addNote();
                    setIsModalOpen(false);
                  }
                }}
                placeholder="Qu'as-tu appris aujourd'hui ?"
                className="flex-1 bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 text-sm focus:bg-white focus:border-blue-100 outline-none transition-all"
              />
              <button
                onClick={() => {
                  addNote();
                  setIsModalOpen(false);
                }}
                className="bg-blue-600 text-white px-6 rounded-2xl font-bold shadow-lg shadow-blue-200 active:scale-95 transition-transform"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
