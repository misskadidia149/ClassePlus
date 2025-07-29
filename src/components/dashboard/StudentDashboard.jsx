import React, { useState, useEffect } from 'react';
import { 
  FiMenu, FiBell, FiMessageSquare, FiUsers, 
  FiFileText, FiCheckCircle, FiUpload, FiDownload,
  FiSearch, FiSend, FiPlus, FiChevronRight, FiUserPlus,
  FiBook, FiHome, FiCalendar, FiClipboard, FiAward, FiFile
} from 'react-icons/fi';
import { BsThreeDotsVertical, BsCheckCircleFill, BsPeopleFill } from 'react-icons/bs';
import { RiProgress5Line, RiFeedbackLine } from 'react-icons/ri';
import { MdOutlineClass, MdOutlineAssignmentTurnedIn } from 'react-icons/md';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [group, setGroup] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [submission, setSubmission] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeTab, setActiveTab] = useState('tasks');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(2);
  const [classes, setClasses] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isCoordinator, setIsCoordinator] = useState(false);

  // Simulation de données améliorée
  useEffect(() => {
    const mockData = {
      group: {
        id: 1,
        name: 'Groupe Alpha',
        coordinator: 'Alice Koné',
        members: ['Alice Koné', 'Bob Diarra', 'Vous'],
        progress: 65,
        avatarColor: '#7F5AF0',
        lastActivity: 'Il y a 2 heures',
        documents: [
          {
            id: 1,
            name: 'Plan de travail.pdf',
            size: '1.2 MB',
            date: '2024-05-10',
            uploadedBy: 'Alice Koné'
          }
        ],
        messages: [
          {
            id: 1,
            sender: 'Alice Koné',
            content: 'N\'oubliez pas de soumettre vos parties du chapitre 2 avant demain',
            date: '2024-06-12 10:30',
            read: false
          }
        ]
      },
      tasks: [
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
          status: 'graded'
        },
        { 
          id: 2, 
          title: 'Présentation intermédiaire', 
          description: 'Préparer les diapositives pour la présentation du 20 juin',
          deadline: '2024-06-20', 
          submitted: false, 
          graded: false,
          status: 'pending'
        },
        { 
          id: 3, 
          title: 'Bibliographie annotée', 
          description: 'Fournir une liste des références avec résumés',
          deadline: '2024-06-25', 
          submitted: true, 
          graded: false,
          status: 'submitted'
        }
      ],
      announcements: [
        {
          id: 1,
          content: 'La date limite pour le chapitre 1 a été prolongée jusqu\'au 20 juin',
          date: '2024-05-25',
          author: 'Dr. Kassogue',
          read: false
        }
      ],
      availableClasses: [
        {
          id: 1,
          name: 'Mémoire de Fin d\'Études',
          description: 'Encadrement des mémoires de fin d\'études',
          teacher: 'Dr. Kassogue',
          students: 15
        }
      ],
      currentClasses: [
        {
          id: 1,
          name: 'Méthodologie de Recherche',
          description: 'Cours avancé sur les méthodes de recherche scientifique',
          teacher: 'Pr. Diallo',
          progress: 45
        }
      ]
    };

    setGroup(mockData.group);
    setTasks(mockData.tasks);
    setAnnouncements(mockData.announcements);
    setAvailableClasses(mockData.availableClasses);
    setClasses(mockData.currentClasses);
    setMessages(mockData.group.messages);
    setIsCoordinator(mockData.group.coordinator === 'Vous');
  }, []);

  // 13. Rejoindre une classe
  const handleJoinClass = (classId) => {
    const classToJoin = availableClasses.find(c => c.id === classId);
    if (classToJoin) {
      setClasses([...classes, classToJoin]);
      setAvailableClasses(availableClasses.filter(c => c.id !== classId));
    }
  };

  // 15. Soumission de travaux
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

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files).map(file => ({
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      type: file.type
    }));
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const removeFile = (fileName) => {
    setUploadedFiles(uploadedFiles.filter(f => f.name !== fileName));
  };

  // 16. Espace groupe (coordinateur)
  const handleAddGroupDocument = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newDoc = {
        id: group.documents.length + 1,
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        date: new Date().toLocaleDateString(),
        uploadedBy: 'Vous'
      };
      setGroup({
        ...group,
        documents: [...group.documents, newDoc]
      });
    }
  };

  // 17. Messagerie
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: 'Vous',
      content: newMessage,
      date: new Date().toLocaleString(),
      read: true
    };
    
    setMessages([newMsg, ...messages]);
    setNewMessage('');
  };

  // 18. Visualisation corrections
  const markAnnouncementAsRead = (id) => {
    setAnnouncements(announcements.map(ann => 
      ann.id === id ? { ...ann, read: true } : ann
    ));
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
            <li className={activeTab === 'classes' ? 'active' : ''} onClick={() => setActiveTab('classes')}>
              <MdOutlineClass className="nav-icon" />
              <span>Mes Classes</span>
              {activeTab === 'classes' && <div className="active-indicator"></div>}
            </li>
            <li className={activeTab === 'tasks' ? 'active' : ''} onClick={() => setActiveTab('tasks')}>
              <MdOutlineAssignmentTurnedIn className="nav-icon" />
              <span>Mes Tâches</span>
              {activeTab === 'tasks' && <div className="active-indicator"></div>}
            </li>
            <li className={activeTab === 'group' ? 'active' : ''} onClick={() => setActiveTab('group')}>
              <FiUsers className="nav-icon" />
              <span>Mon Groupe</span>
              {activeTab === 'group' && <div className="active-indicator"></div>}
            </li>
            <li className={activeTab === 'announcements' ? 'active' : ''} onClick={() => setActiveTab('announcements')}>
              <FiBell className="nav-icon" />
              <span>Annonces</span>
              {activeTab === 'announcements' && <div className="active-indicator"></div>}
              {announcements.filter(a => !a.read).length > 0 && (
                <span className="notification-badge">{announcements.filter(a => !a.read).length}</span>
              )}
            </li>
            <li className={activeTab === 'messages' ? 'active' : ''} onClick={() => setActiveTab('messages')}>
              <FiMessageSquare className="nav-icon" />
              <span>Messagerie</span>
              {activeTab === 'messages' && <div className="active-indicator"></div>}
              {messages.filter(m => !m.read).length > 0 && (
                <span className="notification-badge">{messages.filter(m => !m.read).length}</span>
              )}
            </li>
          </ul>
        </nav>

        <div className="user-profile">
          <div className="avatar">VS</div>
          <div className="user-info">
            <span className="name">Votre Nom</span>
            <span className="role">Étudiant</span>
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
                        <div className="class-avatar">
                          <FiBook size={24} />
                        </div>
                        <div className="class-info">
                          <h3>{cls.name}</h3>
                          <p>Enseignant: {cls.teacher}</p>
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
                <div className="group-avatar" style={{ backgroundColor: group.avatarColor }}>
                  {group.name.charAt(0)}
                </div>
                <div className="group-info">
                  <h2>{group.name}</h2>
                  <div className="group-meta">
                    <span className="coordinator">Coordinateur: {group.coordinator}</span>
                    <span className="last-activity">{group.lastActivity}</span>
                    {isCoordinator && <span className="coordinator-badge">Vous êtes coordinateur</span>}
                  </div>
                </div>
              </div>

              <div className="card progress-card">
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
                
                <div className="progress-steps">
                  <div className="step">
                    <div className={`step-icon ${group.progress > 0 ? 'completed' : ''}`}>
                      {group.progress > 0 ? <BsCheckCircleFill /> : '1'}
                    </div>
                    <span>Thème</span>
                  </div>
                  <div className="step">
                    <div className={`step-icon ${group.progress > 20 ? 'completed' : ''}`}>
                      {group.progress > 20 ? <BsCheckCircleFill /> : '2'}
                    </div>
                    <span>Chap.1</span>
                  </div>
                  <div className="step">
                    <div className={`step-icon ${group.progress > 40 ? 'completed' : ''}`}>
                      {group.progress > 40 ? <BsCheckCircleFill /> : '3'}
                    </div>
                    <span>Chap.2</span>
                  </div>
                  <div className="step">
                    <div className={`step-icon ${group.progress > 60 ? 'completed' : ''}`}>
                      {group.progress > 60 ? <BsCheckCircleFill /> : '4'}
                    </div>
                    <span>Chap.3</span>
                  </div>
                  <div className="step">
                    <div className={`step-icon ${group.progress > 80 ? 'completed' : ''}`}>
                      {group.progress > 80 ? <BsCheckCircleFill /> : '5'}
                    </div>
                    <span>Soutenance</span>
                  </div>
                </div>
              </div>

              <div className="card members-card">
                <div className="section-header">
                  <h3>Membres du groupe ({group.members.length})</h3>
                  <button className="text-button">
                    <FiMessageSquare /> Message
                  </button>
                </div>
                <div className="members-list">
                  {group.members.map(member => (
                    <div key={member} className="member-card">
                      <div className="member-avatar">
                        {member.charAt(0)}
                      </div>
                      <div className="member-info">
                        <span className="member-name">{member}</span>
                        {member === group.coordinator && (
                          <span className="member-role">Coordinateur</span>
                        )}
                        {member === 'Vous' && (
                          <span className="member-role">Vous</span>
                        )}
                      </div>
                      <button className="message-button">
                        <FiSend />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card group-documents-card">
                <div className="section-header">
                  <h3>Documents du groupe</h3>
                  {isCoordinator && (
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
                        <button className="download-button">
                          <FiDownload />
                        </button>
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

              <div className="card group-tasks-card">
                <div className="section-header">
                  <h3>Tâches du groupe</h3>
                  <button className="text-button">
                    Voir tout
                  </button>
                </div>
                <div className="tasks-mini-list">
                  {tasks.filter(t => t.submitted).map(task => (
                    <div key={task.id} className="mini-task-card" data-status={task.status}>
                      <div className="task-info">
                        <h4>{task.title}</h4>
                        <p>Échéance: {task.deadline}</p>
                      </div>
                      <div className="task-status">
                        {task.status === 'graded' ? (
                          <BsCheckCircleFill className="graded-icon" />
                        ) : (
                          <div className="submitted-dot"></div>
                        )}
                      </div>
                    </div>
                  ))}
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
                           {/* <FiPaperclip />*/}
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