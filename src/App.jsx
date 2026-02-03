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

/**
 * Composant principal de l'application Fabrique Hub.
 * Regroupe les outils quotidiens et une gestion de notes locale.
 */
const App = () => {
  // État pour les notes personnelles (stockées dans le localStorage)
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("fabrique-notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [newNote, setNewNote] = useState("");

  // Sauvegarde automatique des notes dans le stockage du navigateur
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

  // Liste des outils de la Fabrique avec leurs icônes et couleurs
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
      desc: "Planning & Notes",
      icon: <BookOpen className="text-emerald-500" />,
      url: "https://portail.campus-centre.fr/",
      color: "bg-emerald-50",
    },
    {
      name: "Docapost",
      desc: "Rémunération",
      icon: <Calendar className="text-red-500" />, // Utilisation de Calendar ou Clock pour le côté administratif
      url: "https://remufp.regioncentre-valdeloire.fr/",
      color: "bg-red-50",
    },
    {
      name: "Portfolio",
      desc: "Mon travail",
      icon: <LayoutGrid className="text-purple-500" />,
      url: "https://mon-portfolio.rtestaert.fr/",
      color: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      {/* Header avec date dynamique */}
      <header className="bg-white border-b sticky top-0 z-10 p-4">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              Fabrique Hub
            </h1>
            <p className="text-[10px] text-slate-500 flex items-center gap-1 uppercase font-semibold">
              <Clock size={12} />{" "}
              {new Date().toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
          </div>
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-blue-200">
            FN
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-6">
        {/* Grille des outils (Boutons d'accès rapide) */}
        <section>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1 text-left">
            Outils de formation
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {tools.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${tool.color} p-4 rounded-2xl border border-white shadow-sm active:scale-95 transition-transform flex flex-col items-start gap-2 group`}
              >
                <div className="p-2 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                  {tool.icon}
                </div>
                <div className="text-left">
                  <div className="font-bold text-sm flex items-center gap-1">
                    {tool.name}{" "}
                    <ExternalLink size={10} className="text-slate-400" />
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {tool.desc}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Bloc Notes de cours (State Management) */}
        <section className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-left">
            <CheckCircle2 className="text-blue-500" /> Notes de cours
          </h2>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addNote()}
              placeholder="Ajouter un mémo..."
              className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              onClick={addNote}
              className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {notes.length === 0 && (
              <p className="text-center text-slate-400 text-sm py-4 italic">
                Pas de notes pour aujourd'hui.
              </p>
            )}
            {notes.map((note) => (
              <div
                key={note.id}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${note.completed ? "bg-slate-50 border-transparent opacity-60" : "bg-white border-slate-100 shadow-sm"}`}
              >
                <div
                  className="flex items-center gap-3 flex-1 cursor-pointer"
                  onClick={() => toggleNote(note.id)}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${note.completed ? "bg-emerald-500 border-emerald-500" : "border-slate-300"}`}
                  >
                    {note.completed && (
                      <CheckCircle2 size={12} className="text-white" />
                    )}
                  </div>
                  <span
                    className={`text-sm text-left ${note.completed ? "line-through text-slate-400" : "text-slate-700 font-medium"}`}
                  >
                    {note.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-slate-300 hover:text-red-500 p-1 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Barre de navigation fixe (Bottom Navbar) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 p-2 flex justify-around items-center max-w-md mx-auto z-20">
        <button className="p-3 text-blue-600 flex flex-col items-center gap-1">
          <LayoutGrid size={22} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">
            Accueil
          </span>
        </button>
        <button className="p-3 text-slate-400 flex flex-col items-center gap-1">
          <Calendar size={22} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">
            Agenda
          </span>
        </button>
        <div className="w-12 h-12 bg-blue-600 rounded-2xl -mt-10 border-4 border-white flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform cursor-pointer">
          <Plus size={24} />
        </div>
        <button className="p-3 text-slate-400 flex flex-col items-center gap-1">
          <Clock size={22} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">
            Flux
          </span>
        </button>
        <button className="p-3 text-slate-400 flex flex-col items-center gap-1">
          <User size={22} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">
            Profil
          </span>
        </button>
      </nav>
    </div>
  );
};

export default App;
