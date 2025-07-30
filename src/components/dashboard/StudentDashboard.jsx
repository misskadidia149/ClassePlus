import React, { useState, useEffect } from 'react';
import { 
  FiMenu, FiBell, FiMessageSquare, FiUsers, 
  FiFileText, FiCheckCircle, FiUpload, FiDownload,
  FiSearch, FiSend, FiPlus, FiChevronRight, FiUserPlus,
  FiBook, FiHome, FiCalendar, FiClipboard, FiAward, FiFile,
  FiEdit2, FiTrash2, FiShare2, FiMoreVertical,FiPaperclip
} from 'react-icons/fi';
import { BsThreeDotsVertical, BsCheckCircleFill, BsPeopleFill } from 'react-icons/bs';
import { RiProgress5Line, RiFeedbackLine } from 'react-icons/ri';
import { MdOutlineClass, MdOutlineAssignmentTurnedIn } from 'react-icons/md';
import './StudentDashboard.css';

const StudentDashboard = () => {
  // États principaux
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(3);
  const [user, setUser] = useState({
    name: 'Alice Koné',
    role: 'Étudiant',
    isCoordinator: true,
    avatar: 'AK'
  });

  // Données des classes
  const [classes, setClasses] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  
  // Données des tâches
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [submission, setSubmission] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  
  // Données du groupe
  const [group, setGroup] = useState(null);
  const [groupMessages, setGroupMessages] = useState([]);
  const [newGroupMessage, setNewGroupMessage] = useState('');
  
  // Annonces
  const [announcements, setAnnouncements] = useState([]);
  
  // Messagerie
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  // Chargement des données initiales
  useEffect(() => {
    // Simuler le chargement des données
    const loadData = () => {
      // Classes
      setClasses([
        {
          id: 1,
          name: 'Mémoire de Fin d\'Études',
          teacher: 'Dr. Kassogue',
          progress: 65,
          code: 'MFE-2024',
          students: 15,
          color: '#7F5AF0'
        }
      ]);

      setAvailableClasses([
        {
          id: 2,
          name: 'Méthodologie de Recherche',
          teacher: 'Pr. Diallo',
          description: 'Cours avancé sur les méthodes de recherche scientifique',
          students: 20
        }
      ]);

      // Tâches
      setTasks([
        { 
          id: 1, 
          title: 'Soumettre le chapitre 1', 
          description: 'Rédaction complète du chapitre 1 avec références bibliographiques',
          deadline: '2024-06-15', 
          submitted: true, 
          graded: true,
          grade: '16/20',
          feedback: 'Bon travail mais approfondir la partie méthodologie',
          files: ['chapitre1.pdf', 'bibliographie.docx'],
          status: 'graded',
          classId: 1
        },
        { 
          id: 2, 
          title: 'Présentation intermédiaire', 
          description: 'Préparer les diapositives pour la présentation du 20 juin',
          deadline: '2024-06-20', 
          submitted: false, 
          graded: false,
          status: 'pending',
          classId: 1
        }
      ]);

      // Groupe
      setGroup({
        id: 1,
        name: 'Groupe Alpha',
        coordinator: 'Alice Koné',
        members: [
          { id: 1, name: 'Alice Koné', role: 'coordinator' },
          { id: 2, name: 'Bob Diarra', role: 'member' },
          { id: 3, name: 'Charlie Sarr', role: 'member' }
        ],
        progress: 65,
        milestones: [
          { id: 1, name: 'Proposition de sujet', completed: true, date: '2024-03-15' },
          { id: 2, name: 'Chapitre 1', completed: true, date: '2024-05-10' },
          { id: 3, name: 'Chapitre 2', completed: false, date: '2024-06-20' },
          { id: 4, name: 'Chapitre 3', completed: false, date: '2024-07-15' }
        ],
        documents: [
          {
            id: 1,
            name: 'Plan de travail.pdf',
            size: '1.2 MB',
            date: '2024-05-10',
            uploadedBy: 'Alice Koné'
          }
        ]
      });

      // Messages du groupe
      setGroupMessages([
        {
          id: 1,
          sender: 'Alice Koné',
          content: 'N\'oubliez pas de soumettre vos parties du chapitre 2 avant demain',
          date: '2024-06-12 10:30',
          read: true
        },
        {
          id: 2,
          sender: 'Bob Diarra',
          content: 'J\'ai terminé ma partie, je vais vous l\'envoyer ce soir',
          date: '2024-06-12 14:15',
          read: true
        }
      ]);

      // Annonces
      setAnnouncements([
        {
          id: 1,
          content: 'La date limite pour le chapitre 1 a été prolongée jusqu\'au 20 juin',
          date: '2024-05-25',
          author: 'Dr. Kassogue',
          important: true,
          read: false
        }
      ]);

      // Messages privés
      setMessages([
        {
          id: 1,
          sender: 'Dr. Kassogue',
          content: 'Votre chapitre 1 a été corrigé, merci de consulter vos notes',
          date: '2024-06-10 09:45',
          read: true,
          private: true
        }
      ]);
    };

    loadData();
  }, []);

  // Fonction pour rejoindre une classe
  const handleJoinClass = (classId) => {
    const classToJoin = availableClasses.find(c => c.id === classId);
    if (classToJoin) {
      setClasses([...classes, { ...classToJoin, progress: 0 }]);
      setAvailableClasses(availableClasses.filter(c => c.id !== classId));
    }
  };

  // Fonction pour soumettre une tâche
  const handleTaskSubmission = (taskId) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { 
        ...task, 
        submitted: true, 
        status: 'submitted',
        files: uploadedFiles.map(f => f.name)
      } : task
    );
    setTasks(updatedTasks);
    setSubmission('');
    setUploadedFiles([]);
    setSelectedTask(null);
  };

  // Fonction pour gérer l'upload de fichiers
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files).map(file => ({
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      type: file.type.split('/')[1]
    }));
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  // Fonction pour supprimer un fichier uploadé
  const removeFile = (fileName) => {
    setUploadedFiles(uploadedFiles.filter(f => f.name !== fileName));
  };

  // Fonction pour ajouter un document au groupe (coordinateur)
  const handleAddGroupDocument = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newDoc = {
        id: group.documents.length + 1,
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        date: new Date().toLocaleDateString(),
        uploadedBy: user.name
      };
      setGroup({
        ...group,
        documents: [...group.documents, newDoc]
      });
    }
  };

  // Fonction pour envoyer un message au groupe
  const handleSendGroupMessage = () => {
    if (!newGroupMessage.trim()) return;
    
    const newMsg = {
      id: groupMessages.length + 1,
      sender: user.name,
      content: newGroupMessage,
      date: new Date().toLocaleString(),
      read: true
    };
    
    setGroupMessages([newMsg, ...groupMessages]);
    setNewGroupMessage('');
  };

  // Fonction pour envoyer un message privé
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: user.name,
      content: newMessage,
      date: new Date().toLocaleString(),
      read: true,
      private: true
    };
    
    setMessages([newMsg, ...messages]);
    setNewMessage('');
  };

  // Fonction pour marquer une annonce comme lue
  const markAnnouncementAsRead = (id) => {
    setAnnouncements(announcements.map(ann => 
      ann.id === id ? { ...ann, read: true } : ann
    ));
  };

  // Fonction pour supprimer un document du groupe (coordinateur)
  const deleteGroupDocument = (docId) => {
    setGroup({
      ...group,
      documents: group.documents.filter(doc => doc.id !== docId)
    });
  };

  return (
    <div className={`student-dashboard ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="app-logo">
            <span className="logo-icon">C</span>
            <span className="logo-text">Classroom ISTA</span>
          </div>
          <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu />
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li 
              className={activeTab === 'dashboard' ? 'active' : ''} 
              onClick={() => setActiveTab('dashboard')}
            >
              <FiHome className="nav-icon" />
              <span>Tableau de bord</span>
            </li>
            
            <li 
              className={activeTab === 'classes' ? 'active' : ''} 
              onClick={() => setActiveTab('classes')}
            >
              <MdOutlineClass className="nav-icon" />
              <span>Mes Classes</span>
            </li>
            
            <li 
              className={activeTab === 'tasks' ? 'active' : ''} 
              onClick={() => setActiveTab('tasks')}
            >
              <MdOutlineAssignmentTurnedIn className="nav-icon" />
              <span>Mes Tâches</span>
            </li>
            
            <li 
              className={activeTab === 'group' ? 'active' : ''} 
              onClick={() => setActiveTab('group')}
            >
              <FiUsers className="nav-icon" />
              <span>Mon Groupe</span>
              {user.isCoordinator && <span className="coordinator-badge">Coordinateur</span>}
            </li>
            
            <li 
              className={activeTab === 'announcements' ? 'active' : ''} 
              onClick={() => setActiveTab('announcements')}
            >
              <FiBell className="nav-icon" />
              <span>Annonces</span>
              {announcements.filter(a => !a.read).length > 0 && (
                <span className="notification-badge">{announcements.filter(a => !a.read).length}</span>
              )}
            </li>
            
            <li 
              className={activeTab === 'messages' ? 'active' : ''} 
              onClick={() => setActiveTab('messages')}
            >
              <FiMessageSquare className="nav-icon" />
              <span>Messagerie</span>
              {messages.filter(m => !m.read).length > 0 && (
                <span className="notification-badge">{messages.filter(m => !m.read).length}</span>
              )}
            </li>
          </ul>
        </nav>

        <div className="user-profile">
          <div className="avatar">{user.avatar}</div>
          <div className="user-info">
            <span className="name">{user.name}</span>
            <span className="role">{user.role}</span>
          </div>
          <button className="user-menu">
            <BsThreeDotsVertical />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header>
          <div className="header-left">
            <h1>
              {activeTab === 'dashboard' && 'Tableau de bord'}
              {activeTab === 'classes' && 'Mes Classes'}
              {activeTab === 'tasks' && 'Mes Tâches'}
              {activeTab === 'group' && 'Mon Groupe'}
              {activeTab === 'announcements' && 'Annonces'}
              {activeTab === 'messages' && 'Messagerie'}
            </h1>
            {activeTab === 'tasks' && selectedTask && (
              <div className="breadcrumb">
                <span>Tâches</span>
                <FiChevronRight size={14} />
                <span>{selectedTask.title}</span>
              </div>
            )}
          </div>
          <div className="header-right">
            <button className="icon-button notification-badge" data-count={notifications}>
              <FiBell />
            </button>
            <div className="search-bar">
              <FiSearch className="search-icon" />
              <input type="text" placeholder="Rechercher..." />
            </div>
          </div>
        </header>

        <div className="content-area">
          {/* Tableau de bord */}
          {activeTab === 'dashboard' && (
            <div className="dashboard-tab">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">
                    <MdOutlineClass size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{classes.length}</h3>
                    <p>Classes</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">
                    <MdOutlineAssignmentTurnedIn size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{tasks.length}</h3>
                    <p>Tâches</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">
                    <RiProgress5Line size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{group?.progress}%</h3>
                    <p>Progression du projet</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">
                    <FiBell size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{announcements.length}</h3>
                    <p>Annonces</p>
                  </div>
                </div>
              </div>

              <div className="dashboard-sections">
                {/* Prochaines tâches */}
                <div className="dashboard-section">
                  <div className="section-header">
                    <h2>Prochaines tâches</h2>
                    <button className="view-all">Voir tout</button>
                  </div>
                  <div className="tasks-list">
                    {tasks.slice(0, 3).map(task => (
                      <div 
                        key={task.id} 
                        className={`task-card ${task.status}`}
                        onClick={() => {
                          setSelectedTask(task);
                          setActiveTab('tasks');
                        }}
                      >
                        <div className="task-header">
                          <h3>{task.title}</h3>
                          <span className="deadline">Échéance: {task.deadline}</span>
                        </div>
                        <div className="task-status">
                          {task.status === 'graded' && <BsCheckCircleFill className="graded-icon" />}
                          <span className={`status-badge ${task.status}`}>
                            {task.status === 'pending' && 'À faire'}
                            {task.status === 'submitted' && 'Soumis'}
                            {task.status === 'graded' && task.grade}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dernières annonces */}
                <div className="dashboard-section">
                  <div className="section-header">
                    <h2>Dernières annonces</h2>
                    <button className="view-all">Voir tout</button>
                  </div>
                  <div className="announcements-list">
                    {announcements.slice(0, 3).map(announcement => (
                      <div 
                        key={announcement.id} 
                        className={`announcement-card ${!announcement.read ? 'unread' : ''}`}
                        onClick={() => {
                          markAnnouncementAsRead(announcement.id);
                          setActiveTab('announcements');
                        }}
                      >
                        <div className="announcement-header">
                          <div className="announcement-author">
                            <div className="author-avatar">
                              {announcement.author.charAt(0)}
                            </div>
                            <span>{announcement.author}</span>
                          </div>
                          <div className="announcement-date">{announcement.date}</div>
                        </div>
                        <div className="announcement-content">
                          {announcement.content}
                        </div>
                        {announcement.important && (
                          <div className="important-badge">Important</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progression du groupe */}
                {group && (
                  <div className="dashboard-section">
                    <div className="section-header">
                      <h2>Progression du groupe</h2>
                      <button 
                        className="view-all"
                        onClick={() => setActiveTab('group')}
                      >
                        Voir le groupe
                      </button>
                    </div>
                    <div className="progress-container">
                      <div className="progress-labels">
                        <span>Progression globale</span>
                        <span>{group.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${group.progress}%` }}></div>
                      </div>
                    </div>
                    <div className="milestones-list">
                      {group.milestones.slice(0, 3).map(milestone => (
                        <div key={milestone.id} className="milestone-item">
                          <div className={`milestone-checkbox ${milestone.completed ? 'completed' : ''}`}>
                            {milestone.completed ? <BsCheckCircleFill /> : <div className="empty-circle" />}
                          </div>
                          <div className="milestone-info">
                            <h4>{milestone.name}</h4>
                            <span className="milestone-date">{milestone.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Classes Tab */}
          {activeTab === 'classes' && (
            <div className="classes-tab">
              <div className="section-header">
                <h2>Mes Classes Actuelles</h2>
              </div>
              
              {classes.length > 0 ? (
                <div className="classes-grid">
                  {classes.map(cls => (
                    <div key={cls.id} className="class-card">
                      <div className="class-header">
                        <div className="class-avatar" style={{ backgroundColor: cls.color }}>
                          {cls.name.charAt(0)}
                        </div>
                        <div className="class-info">
                          <h3>{cls.name}</h3>
                          <p>Enseignant: {cls.teacher}</p>
                          <p>Code: {cls.code}</p>
                        </div>
                      </div>
                      <div className="progress-container">
                        <div className="progress-labels">
                          <span>Progression</span>
                          <span>{cls.progress}%</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${cls.progress}%` }}></div>
                        </div>
                      </div>
                      <div className="class-stats">
                        <span><FiUsers /> {cls.students} étudiants</span>
                      </div>
                      <button className="primary-button">
                        Accéder à la classe
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <FiBook size={48} className="empty-icon" />
                  <h3>Aucune classe actuellement</h3>
                  <p>Rejoignez une classe pour commencer</p>
                </div>
              )}

              {availableClasses.length > 0 && (
                <>
                  <div className="section-header">
                    <h2>Classes Disponibles</h2>
                  </div>
                  <div className="classes-grid">
                    {availableClasses.map(cls => (
                      <div key={cls.id} className="class-card">
                        <div className="class-header">
                          <div className="class-avatar">
                            <FiBook size={24} />
                          </div>
                          <div className="class-info">
                            <h3>{cls.name}</h3>
                            <p>Enseignant: {cls.teacher}</p>
                            <p>{cls.students} étudiants inscrits</p>
                          </div>
                        </div>
                        <p className="class-description">{cls.description}</p>
                        <button 
                          className="primary-button"
                          onClick={() => handleJoinClass(cls.id)}
                        >
                          Rejoindre la classe
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <div className="tasks-tab">
              <div className="tasks-list">
                <div className="section-header">
                  <h2>Mes Tâches</h2>
                  <div className="filter-options">
                    <button className="filter-button active">Toutes</button>
                    <button className="filter-button">À faire</button>
                    <button className="filter-button">Soumises</button>
                    <button className="filter-button">Corrigées</button>
                  </div>
                </div>
                
                {tasks.length > 0 ? (
                  tasks.map(task => (
                    <div 
                      key={task.id} 
                      className={`task-card ${task.status}`}
                      onClick={() => setSelectedTask(task)}
                    >
                      <div className="task-header">
                        <div className="task-title">
                          <h3>{task.title}</h3>
                          <span className="deadline">Échéance: {task.deadline}</span>
                        </div>
                        <div className="task-status">
                          {task.status === 'graded' && <BsCheckCircleFill className="graded-icon" />}
                          <span className={`status-badge ${task.status}`}>
                            {task.status === 'pending' && 'À faire'}
                            {task.status === 'submitted' && 'Soumis'}
                            {task.status === 'graded' && task.grade}
                          </span>
                        </div>
                      </div>
                      <p className="task-description">{task.description}</p>
                      <div className="task-class">
                        {classes.find(c => c.id === task.classId)?.name}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <FiFileText size={48} className="empty-icon" />
                    <h3>Aucune tâche pour le moment</h3>
                    <p>Les tâches assignées apparaîtront ici</p>
                  </div>
                )}
              </div>

              {selectedTask && (
                <div className="task-details">
                  <div className="task-details-header">
                    <h2>{selectedTask.title}</h2>
                    <button className="close-button" onClick={() => setSelectedTask(null)}>×</button>
                  </div>
                  
                  <div className="task-meta">
                    <div className="meta-item">
                      <span className="meta-label">Date limite:</span>
                      <span className="meta-value">{selectedTask.deadline}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Classe:</span>
                      <span className="meta-value">
                        {classes.find(c => c.id === selectedTask.classId)?.name}
                      </span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Statut:</span>
                      <span className={`meta-value status ${selectedTask.status}`}>
                        {selectedTask.status === 'pending' && 'À faire'}
                        {selectedTask.status === 'submitted' && 'Soumis'}
                        {selectedTask.status === 'graded' && 'Corrigé'}
                      </span>
                    </div>
                    {selectedTask.graded && (
                      <div className="meta-item">
                        <span className="meta-label">Note:</span>
                        <span className="meta-value grade">{selectedTask.grade}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="detail-section">
                    <h3>Description</h3>
                    <p>{selectedTask.description}</p>
                  </div>

                  {selectedTask.graded && selectedTask.feedback && (
                    <div className="detail-section feedback">
                      <h3>Feedback du professeur</h3>
                      <div className="feedback-content">
                        <p>{selectedTask.feedback}</p>
                      </div>
                    </div>
                  )}

                  {selectedTask.files && selectedTask.files.length > 0 && (
                    <div className="detail-section">
                      <h3>Fichiers soumis</h3>
                      <div className="files-list">
                        {selectedTask.files.map((file, index) => (
                          <div key={index} className="file-item">
                            <FiFile className="file-icon" />
                            <span className="file-name">{file}</span>
                            <button className="download-button">Télécharger</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!selectedTask.submitted ? (
                    <div className="detail-section submission-form">
                      <h3>Soumettre votre travail</h3>
                      <div className="form-group">
                        <label>Commentaires (optionnel)</label>
                        <textarea
                          value={submission}
                          onChange={(e) => setSubmission(e.target.value)}
                          placeholder="Décrivez votre travail ou posez des questions..."
                          rows="4"
                        />
                      </div>
                      <div className="form-group">
                        <label>Fichiers à soumettre</label>
                        <div className="file-upload">
                          <label className="upload-area">
                            <FiUpload className="upload-icon" />
                            <span className="upload-text">Glissez-déposez vos fichiers ou <span className="browse-link">parcourez</span></span>
                            <input 
                              type="file" 
                              multiple 
                              onChange={handleFileUpload}
                              style={{ display: 'none' }}
                            />
                          </label>
                        </div>
                        {uploadedFiles.length > 0 && (
                          <div className="uploaded-files">
                            {uploadedFiles.map((file, index) => (
                              <div key={index} className="uploaded-file">
                                <FiFile className="file-icon" />
                                <span className="file-name">{file.name}</span>
                                <span className="file-size">{file.size}</span>
                                <button 
                                  className="remove-file"
                                  onClick={() => removeFile(file.name)}
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <button 
                        className="primary-button submit-button"
                        onClick={() => handleTaskSubmission(selectedTask.id)}
                        disabled={uploadedFiles.length === 0}
                      >
                        <FiUpload /> Soumettre le travail
                      </button>
                    </div>
                  ) : (
                    <div className="detail-section submission-status">
                      <h3>Soumission envoyée</h3>
                      <div className="status-message">
                        <BsCheckCircleFill className="success-icon" />
                        <p>Votre travail a été soumis avec succès le {selectedTask.deadline}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Group Tab */}
          {activeTab === 'group' && group && (
            <div className="group-tab">
              <div className="group-header">
                <div className="group-avatar">
                  {group.name.charAt(0)}
                </div>
                <div className="group-info">
                  <h2>{group.name}</h2>
                  <div className="group-meta">
                    <span className="coordinator">Coordinateur: {group.coordinator}</span>
                    <span className="last-activity">Dernière activité: Aujourd'hui</span>
                    {user.isCoordinator && <span className="coordinator-badge">Vous êtes coordinateur</span>}
                  </div>
                </div>
              </div>

              <div className="group-sections">
                {/* Progression */}
                <div className="group-section">
                  <h3>Progression du projet</h3>
                  <div className="progress-container">
                    <div className="progress-labels">
                      <span>Progression globale</span>
                      <span>{group.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${group.progress}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="milestones-list">
                    <h4>Jalons</h4>
                    {group.milestones.map(milestone => (
                      <div key={milestone.id} className="milestone-item">
                        <div className={`milestone-checkbox ${milestone.completed ? 'completed' : ''}`}>
                          {milestone.completed ? <BsCheckCircleFill /> : <div className="empty-circle" />}
                        </div>
                        <div className="milestone-info">
                          <h5>{milestone.name}</h5>
                          <span className="milestone-date">{milestone.date}</span>
                        </div>
                        {user.isCoordinator && (
                          <button className="icon-btn">
                            <FiEdit2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Membres */}
                <div className="group-section">
                  <div className="section-header">
                    <h3>Membres du groupe ({group.members.length})</h3>
                    <button className="text-button">
                      <FiMessageSquare /> Message
                    </button>
                  </div>
                  <div className="members-list">
                    {group.members.map(member => (
                      <div key={member.id} className="member-card">
                        <div className="member-avatar">
                          {member.name.charAt(0)}
                        </div>
                        <div className="member-info">
                          <span className="member-name">{member.name}</span>
                          {member.role === 'coordinator' && (
                            <span className="member-role">Coordinateur</span>
                          )}
                        </div>
                        <button className="message-button">
                          <FiSend />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Documents */}
                <div className="group-section">
                  <div className="section-header">
                    <h3>Documents du groupe</h3>
                    {user.isCoordinator && (
                      <label className="text-button file-upload">
                        <FiUpload /> Ajouter
                        <input 
                          type="file" 
                          onChange={handleAddGroupDocument}
                          style={{ display: 'none' }}
                        />
                      </label>
                    )}
                  </div>
                  {group.documents.length > 0 ? (
                    <div className="documents-list">
                      {group.documents.map(doc => (
                        <div key={doc.id} className="document-item">
                          <FiFile className="file-icon" />
                          <div className="document-info">
                            <span className="document-name">{doc.name}</span>
                            <span className="document-meta">
                              {doc.size} • {doc.date} • {doc.uploadedBy}
                            </span>
                          </div>
                          <div className="document-actions">
                            <button className="download-button">
                              <FiDownload />
                            </button>
                            {user.isCoordinator && (
                              <button 
                                className="delete-button"
                                onClick={() => deleteGroupDocument(doc.id)}
                              >
                                <FiTrash2 />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <FiFile size={32} className="empty-icon" />
                      <p>Aucun document partagé</p>
                    </div>
                  )}
                </div>

                {/* Discussion */}
                <div className="group-section">
                  <div className="section-header">
                    <h3>Discussion de groupe</h3>
                  </div>
                  <div className="group-discussion">
                    <div className="messages-list">
                      {groupMessages.map(message => (
                        <div key={message.id} className={`message-item ${message.sender === user.name ? 'sent' : 'received'}`}>
                          <div className="message-header">
                            <span className="sender">{message.sender}</span>
                            <span className="time">{message.date}</span>
                          </div>
                          <div className="message-content">
                            {message.content}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="message-input">
                      <input
                        type="text"
                        placeholder="Écrire un message..."
                        value={newGroupMessage}
                        onChange={(e) => setNewGroupMessage(e.target.value)}
                      />
                      <button 
                        className="send-button"
                        onClick={handleSendGroupMessage}
                        disabled={!newGroupMessage.trim()}
                      >
                        <FiSend />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Announcements Tab */}
          {activeTab === 'announcements' && (
            <div className="announcements-tab">
              <div className="section-header">
                <h2>Dernières annonces</h2>
                <div className="filter-options">
                  <button className="filter-button active">Toutes</button>
                  <button className="filter-button">Non lues</button>
                  <button className="filter-button">Importantes</button>
                </div>
              </div>
              
              {announcements.length > 0 ? (
                <div className="announcements-list">
                  {announcements.map(announcement => (
                    <div 
                      key={announcement.id} 
                      className={`announcement-card ${!announcement.read ? 'unread' : ''}`}
                      onClick={() => markAnnouncementAsRead(announcement.id)}
                    >
                      <div className="announcement-header">
                        <div className="announcement-author">
                          <div className="author-avatar">
                            {announcement.author.charAt(0)}
                          </div>
                          <span>{announcement.author}</span>
                        </div>
                        <div className="announcement-date">{announcement.date}</div>
                      </div>
                      <div className="announcement-content">
                        {announcement.content}
                      </div>
                      {announcement.important && (
                        <div className="important-badge">Important</div>
                      )}
                      {!announcement.read && (
                        <div className="unread-badge">Nouveau</div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <FiBell size={48} className="empty-icon" />
                  <h3>Aucune annonce pour le moment</h3>
                  <p>Les nouvelles annonces apparaîtront ici</p>
                </div>
              )}
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="messages-tab">
              <div className="messages-container">
                <div className="conversations-list">
                  <div className="section-header">
                    <h2>Messages</h2>
                    <button className="primary-button small">
                      <FiPlus /> Nouveau
                    </button>
                  </div>
                  
                  <div className="search-bar">
                    <FiSearch className="search-icon" />
                    <input type="text" placeholder="Rechercher des messages..." />
                  </div>
                  
                  {messages.length > 0 ? (
                    messages.map(message => (
                      <div 
                        key={message.id} 
                        className={`conversation-card ${selectedMessage?.id === message.id ? 'active' : ''}`}
                        onClick={() => setSelectedMessage(message)}
                      >
                        {!message.read && <div className="unread-badge"></div>}
                        <div className="avatar">
                          {message.sender.charAt(0)}
                        </div>
                        <div className="conversation-info">
                          <div className="conversation-header">
                            <span className="name">{message.sender}</span>
                            <span className="time">{message.date}</span>
                          </div>
                          <p className="last-message">{message.content}</p>
                          {message.private && (
                            <span className="private-badge">Privé</span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="empty-conversations">
                      <FiMessageSquare size={32} />
                      <p>Aucun message pour le moment</p>
                    </div>
                  )}
                </div>
                
                <div className="conversation-detail">
                  {selectedMessage ? (
                    <>
                      <div className="message-header">
                        <div className="message-author">
                          <div className="avatar">
                            {selectedMessage.sender.charAt(0)}
                          </div>
                          <div className="author-info">
                            <h3>{selectedMessage.sender}</h3>
                            <span className="message-date">{selectedMessage.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="message-content">
                        <p>{selectedMessage.content}</p>
                      </div>
                      <div className="message-reply">
                        <textarea 
                          placeholder="Écrivez votre réponse..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <div className="reply-actions">
                          <button className="icon-button">
                            <FiPaperclip />
                          </button>
                          <button 
                            className="primary-button small"
                            onClick={handleSendMessage}
                            disabled={!newMessage.trim()}
                          >
                            <FiSend /> Envoyer
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="empty-state">
                      <FiMessageSquare size={48} className="icon" />
                      <h3>Aucune conversation sélectionnée</h3>
                      <p>Sélectionnez une conversation ou créez-en une nouvelle</p>
                      <button className="primary-button">
                        <FiPlus /> Nouveau message
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;