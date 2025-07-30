import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiMenu, FiBell, FiMessageSquare, FiUsers, FiFileText, 
  FiCheckCircle, FiUpload, FiPlus, FiSearch, FiDownload, 
  FiSend, FiEdit2, FiFile, FiTrash2, FiUser, FiBook, 
  FiHome, FiCalendar, FiClipboard, FiAward, FiChevronDown,
  FiBarChart2, FiSettings, FiMail, FiFilePlus, FiPaperclip
} from 'react-icons/fi';
import { BsThreeDotsVertical, BsCheckCircleFill, BsPeopleFill } from 'react-icons/bs';
import { RiProgress5Line, RiFeedbackLine } from 'react-icons/ri';
import { MdOutlineClass, MdOutlineAssignmentTurnedIn } from 'react-icons/md';
import { AiOutlineTeam } from 'react-icons/ai';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  // États principaux
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const navigate = useNavigate();

  // États pour les données
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [messages, setMessages] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [documents, setDocuments] = useState([]);

  // États pour les formulaires
  const [showClassForm, setShowClassForm] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);

  // Données de formulaire
  const [newClass, setNewClass] = useState({ name: '', description: '' });
  const [newStudent, setNewStudent] = useState({ name: '', email: '', class: '' });
  const [newGroup, setNewGroup] = useState({ name: '', class: '', coordinator: '' });
  const [newTask, setNewTask] = useState({ 
    title: '', 
    description: '', 
    deadline: '', 
    forGroup: 'all',
    file: null 
  });
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [newDocument, setNewDocument] = useState(null);

  // Sélections
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Charger les données initiales
  useEffect(() => {
    // Simuler le chargement des données
    const mockData = {
      classes: [
        { id: 1, name: 'Mémoire de Fin d\'Études', code: 'MFE-2024', description: 'Encadrement des mémoires', students: 15, groups: 5 },
        { id: 2, name: 'Projet Intégrateur', code: 'PI-2024', description: 'Projets technologiques', students: 20, groups: 6 }
      ],
      students: [
        { id: 1, name: 'Alice Koné', email: 'alice@ista.edu', class: 'Mémoire de Fin d\'Études', group: 'Groupe Alpha' },
        { id: 2, name: 'Bob Diarra', email: 'bob@ista.edu', class: 'Mémoire de Fin d\'Études', group: 'Groupe Alpha' },
        { id: 3, name: 'Charlie Traoré', email: 'charlie@ista.edu', class: 'Mémoire de Fin d\'Études', group: 'Groupe Beta' },
        { id: 4, name: 'David Coulibaly', email: 'david@ista.edu', class: 'Projet Intégrateur', group: 'Groupe Gamma' }
      ],
      groups: [
        { 
          id: 1, 
          name: 'Groupe Alpha', 
          class: 'Mémoire de Fin d\'Études',
          coordinator: 'Alice Koné', 
          members: ['Alice Koné', 'Bob Diarra'], 
          progress: 65,
          milestones: [
            { name: 'Proposition', completed: true, date: '2024-01-15' },
            { name: 'Chapitre 1', completed: true, date: '2024-03-10' },
            { name: 'Chapitre 2', completed: false },
            { name: 'Soutenance', completed: false }
          ]
        },
        { 
          id: 2, 
          name: 'Groupe Beta', 
          class: 'Mémoire de Fin d\'Études',
          coordinator: 'Charlie Traoré', 
          members: ['Charlie Traoré'], 
          progress: 40,
          milestones: [
            { name: 'Proposition', completed: true, date: '2024-02-01' },
            { name: 'Chapitre 1', completed: false },
            { name: 'Soutenance', completed: false }
          ]
        }
      ],
      tasks: [
        { 
          id: 1, 
          title: 'Soumettre le chapitre 1', 
          description: 'Rédaction du premier chapitre avec problématique',
          group: 'all', 
          deadline: '2024-06-15', 
          submissions: [
            { groupId: 1, file: 'chapitre1_alpha.pdf', date: '2024-06-14', grade: '16/20', feedback: 'Bon travail mais méthodo à préciser' }
          ]
        },
        { 
          id: 2, 
          title: 'Proposition de sujet', 
          description: 'Dépôt de la proposition de sujet',
          group: 'Groupe Beta', 
          deadline: '2024-05-10', 
          submissions: []
        }
      ],
      announcements: [
        { id: 1, content: 'La date limite pour le chapitre 1 est prolongée', date: '2024-05-25', author: 'Dr. Kassogue', important: true },
        { id: 2, content: 'Réunion de suivi demain à 10h', date: '2024-06-10', author: 'Dr. Kassogue', important: false }
      ],
      documents: [
        { id: 1, name: 'Guide du mémoire.pdf', type: 'pdf', size: '2.4 MB', date: '2024-05-10', group: 'all' },
        { id: 2, name: 'Template.docx', type: 'doc', size: '1.2 MB', date: '2024-05-12', group: 'Groupe Alpha' }
      ],
      messages: [
        { 
          id: 1, 
          sender: 'Groupe Alpha', 
          content: 'Nous avons une question sur le chapitre 2', 
          date: '2024-06-12', 
          isPrivate: true,
          replies: [] 
        },
        { 
          id: 2, 
          sender: null, 
          content: 'Rappel: Soumettre votre plan avant vendredi', 
          date: '2024-06-15', 
          isPrivate: false,
          replies: [
            { sender: 'Groupe Beta', content: 'Nous avons soumis notre plan', date: '2024-06-16' }
          ] 
        }
      ],
      notifications: [
        { id: 1, title: 'Nouvelle soumission', content: 'Groupe Alpha a soumis le chapitre 1', date: '2024-06-14', read: false },
        { id: 2, title: 'Message privé', content: 'Vous avez un nouveau message', date: '2024-06-13', read: false }
      ]
    };

    setClasses(mockData.classes);
    setStudents(mockData.students);
    setGroups(mockData.groups);
    setTasks(mockData.tasks);
    setAnnouncements(mockData.announcements);
    setDocuments(mockData.documents);
    setMessages(mockData.messages);
    setNotifications(mockData.notifications);
  }, []);

  // Fonctions de gestion
  const createClass = () => {
    const newClassObj = {
      id: classes.length + 1,
      ...newClass,
      code: `CLS-${Math.floor(1000 + Math.random() * 9000)}`,
      students: 0,
      groups: 0
    };
    setClasses([...classes, newClassObj]);
    setNewClass({ name: '', description: '' });
    setShowClassForm(false);
  };

  const addStudent = () => {
    const newStudentObj = {
      id: students.length + 1,
      ...newStudent,
      group: 'Non assigné'
    };
    setStudents([...students, newStudentObj]);
    setNewStudent({ name: '', email: '', class: '' });
    setShowStudentForm(false);
  };

  const createGroup = () => {
    const newGroupObj = {
      id: groups.length + 1,
      ...newGroup,
      members: [],
      progress: 0,
      milestones: [
        { name: 'Proposition', completed: false },
        { name: 'Chapitre 1', completed: false },
        { name: 'Chapitre 2', completed: false },
        { name: 'Soutenance', completed: false }
      ]
    };
    setGroups([...groups, newGroupObj]);
    setNewGroup({ name: '', class: '', coordinator: '' });
    setShowGroupForm(false);
  };

  const assignTask = () => {
    const newTaskObj = {
      id: tasks.length + 1,
      ...newTask,
      submissions: []
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask({ title: '', description: '', deadline: '', forGroup: 'all', file: null });
    setShowTaskForm(false);
  };

  const publishAnnouncement = () => {
    const newAnnouncementObj = {
      id: announcements.length + 1,
      content: newAnnouncement,
      date: new Date().toLocaleDateString(),
      author: 'Dr. Kassogue',
      important: false
    };
    setAnnouncements([newAnnouncementObj, ...announcements]);
    setNewAnnouncement('');
    setShowAnnouncementForm(false);
  };

  const uploadDocument = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const newDoc = {
      id: documents.length + 1,
      name: file.name,
      type: file.name.split('.').pop(),
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      date: new Date().toLocaleDateString(),
      group: selectedGroup?.name || 'all'
    };
    
    setDocuments([...documents, newDoc]);
    setShowDocumentUpload(false);
    e.target.value = null;
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const toggleMilestone = (groupId, milestoneName) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        const updatedMilestones = group.milestones.map(m => 
          m.name === milestoneName 
            ? { ...m, completed: !m.completed, date: m.completed ? null : new Date().toLocaleDateString() } 
            : m
        );
        
        const completedCount = updatedMilestones.filter(m => m.completed).length;
        const newProgress = Math.round((completedCount / updatedMilestones.length) * 100);
        
        return {
          ...group,
          milestones: updatedMilestones,
          progress: newProgress
        };
      }
      return group;
    }));
  };

  // Filtres
  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.coordinator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div className={`teacher-dashboard ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="app-logo">
            <span className="logo-icon">ISTA</span>
            <span className="logo-text">Classroom</span>
          </div>
          <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu />
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
              <FiHome className="nav-icon" />
              <span>Tableau de bord</span>
            </li>
            <li className={activeTab === 'classes' ? 'active' : ''} onClick={() => setActiveTab('classes')}>
              <MdOutlineClass className="nav-icon" />
              <span>Classes</span>
            </li>
            <li className={activeTab === 'students' ? 'active' : ''} onClick={() => setActiveTab('students')}>
              <BsPeopleFill className="nav-icon" />
              <span>Étudiants</span>
            </li>
            <li className={activeTab === 'groups' ? 'active' : ''} onClick={() => setActiveTab('groups')}>
              <AiOutlineTeam className="nav-icon" />
              <span>Groupes</span>
            </li>
            <li className={activeTab === 'projects' ? 'active' : ''} onClick={() => setActiveTab('projects')}>
              <FiAward className="nav-icon" />
              <span>Projets</span>
            </li>
            <li className={activeTab === 'tasks' ? 'active' : ''} onClick={() => setActiveTab('tasks')}>
              <MdOutlineAssignmentTurnedIn className="nav-icon" />
              <span>Tâches</span>
            </li>
            <li className={activeTab === 'progress' ? 'active' : ''} onClick={() => setActiveTab('progress')}>
              <RiProgress5Line className="nav-icon" />
              <span>Progression</span>
            </li>
            <li className={activeTab === 'messages' ? 'active' : ''} onClick={() => setActiveTab('messages')}>
              <FiMessageSquare className="nav-icon" />
              <span>Messages</span>
              {messages.filter(m => !m.read && m.isPrivate).length > 0 && (
                <span className="badge">{messages.filter(m => !m.read && m.isPrivate).length}</span>
              )}
            </li>
            <li className={activeTab === 'announcements' ? 'active' : ''} onClick={() => setActiveTab('announcements')}>
              <FiBell className="nav-icon" />
              <span>Annonces</span>
            </li>
            <li className={activeTab === 'documents' ? 'active' : ''} onClick={() => setActiveTab('documents')}>
              <FiFile className="nav-icon" />
              <span>Documents</span>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">HK</div>
            <div className="user-info">
              <span className="name">Dr. H. Kassogue</span>
              <span className="role">Enseignant</span>
            </div>
          </div>
          <button className="settings-btn">
            <FiSettings />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header>
          <div className="header-left">
            <h1>
              {activeTab === 'dashboard' && 'Tableau de bord'}
              {activeTab === 'classes' && 'Gestion des Classes'}
              {activeTab === 'students' && 'Gestion des Étudiants'}
              {activeTab === 'groups' && 'Gestion des Groupes'}
              {activeTab === 'projects' && 'Suivi des Projets'}
              {activeTab === 'tasks' && 'Tâches et Travaux'}
              {activeTab === 'progress' && 'Progression des Groupes'}
              {activeTab === 'messages' && 'Messagerie'}
              {activeTab === 'announcements' && 'Annonces'}
              {activeTab === 'documents' && 'Documents Partagés'}
            </h1>
          </div>
          <div className="header-right">
            <div className="search-bar">
              <FiSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="notifications">
              <button 
                className="notification-btn" 
                onClick={() => setShowNotificationPanel(!showNotificationPanel)}
                data-count={unreadNotifications}
              >
                <FiBell />
              </button>
              {showNotificationPanel && (
                <div className="notifications-panel">
                  <div className="panel-header">
                    <h3>Notifications</h3>
                    <button 
                      className="mark-all-read"
                      onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                    >
                      Tout marquer comme lu
                    </button>
                  </div>
                  <div className="notifications-list">
                    {notifications.slice(0, 5).map(notification => (
                      <div 
                        key={notification.id} 
                        className={`notification-item ${notification.read ? '' : 'unread'}`}
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        <div className="notification-icon">
                          {notification.title.includes('soumission') ? <FiUpload /> : <FiMessageSquare />}
                        </div>
                        <div className="notification-content">
                          <h4>{notification.title}</h4>
                          <p>{notification.content}</p>
                          <span className="notification-time">{notification.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="panel-footer">
                    <button onClick={() => setActiveTab('notifications')}>
                      Voir toutes les notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="content-area">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="dashboard-tab">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">
                    <MdOutlineClass />
                  </div>
                  <div className="stat-info">
                    <h3>{classes.length}</h3>
                    <p>Classes</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <BsPeopleFill />
                  </div>
                  <div className="stat-info">
                    <h3>{students.length}</h3>
                    <p>Étudiants</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <AiOutlineTeam />
                  </div>
                  <div className="stat-info">
                    <h3>{groups.length}</h3>
                    <p>Groupes</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <MdOutlineAssignmentTurnedIn />
                  </div>
                  <div className="stat-info">
                    <h3>{tasks.length}</h3>
                    <p>Tâches actives</p>
                  </div>
                </div>
              </div>

              <div className="dashboard-content">
                <div className="dashboard-section">
                  <div className="section-header">
                    <h2>Dernières annonces</h2>
                    <button className="view-all" onClick={() => setActiveTab('announcements')}>
                      Voir tout
                    </button>
                  </div>
                  <div className="announcements-list">
                    {announcements.slice(0, 3).map(announcement => (
                      <div key={announcement.id} className="announcement-item">
                        <div className="announcement-content">
                          <p>{announcement.content}</p>
                          <span className="announcement-date">{announcement.date}</span>
                        </div>
                        {announcement.important && <span className="important-badge">Important</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="dashboard-section">
                  <div className="section-header">
                    <h2>Tâches récentes</h2>
                    <button className="view-all" onClick={() => setActiveTab('tasks')}>
                      Voir tout
                    </button>
                  </div>
                  <div className="tasks-list">
                    {tasks.slice(0, 3).map(task => (
                      <div key={task.id} className="task-item">
                        <div className="task-info">
                          <h4>{task.title}</h4>
                          <p>{task.description.substring(0, 60)}...</p>
                          <div className="task-meta">
                            <span><FiCalendar /> {task.deadline}</span>
                            <span>{task.group === 'all' ? 'Tous groupes' : task.group}</span>
                          </div>
                        </div>
                        <div className="task-status">
                          <div className="submission-count">
                            {task.submissions.length} soumission{task.submissions.length !== 1 ? 's' : ''}
                          </div>
                          <button 
                            className="view-btn"
                            onClick={() => {
                              setSelectedTask(task);
                              setActiveTab('tasks');
                            }}
                          >
                            Voir
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="dashboard-section">
                  <div className="section-header">
                    <h2>Progression des groupes</h2>
                    <button className="view-all" onClick={() => setActiveTab('progress')}>
                      Voir tout
                    </button>
                  </div>
                  <div className="progress-list">
                    {groups.slice(0, 3).map(group => (
                      <div key={group.id} className="progress-item">
                        <div className="group-info">
                          <div className="group-avatar">{group.name.charAt(0)}</div>
                          <h4>{group.name}</h4>
                        </div>
                        <div className="progress-bar-container">
                          <div className="progress-labels">
                            <span>Progression</span>
                            <span>{group.progress}%</span>
                          </div>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${group.progress}%` }}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Classes Tab */}
          {activeTab === 'classes' && (
            <div className="classes-tab">
              <div className="section-header">
                <h2>Vos Classes</h2>
                <button className="primary-btn" onClick={() => setShowClassForm(true)}>
                  <FiPlus /> Nouvelle classe
                </button>
              </div>

              {showClassForm && (
                <div className="modal-form">
                  <div className="modal-header">
                    <h3>Créer une nouvelle classe</h3>
                    <button className="close-btn" onClick={() => setShowClassForm(false)}>
                      &times;
                    </button>
                  </div>
                  <div className="form-group">
                    <label>Nom de la classe</label>
                    <input 
                      type="text" 
                      value={newClass.name}
                      onChange={(e) => setNewClass({...newClass, name: e.target.value})}
                      placeholder="Ex: Mémoire de Fin d'Études"
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={newClass.description}
                      onChange={(e) => setNewClass({...newClass, description: e.target.value})}
                      placeholder="Description de la classe..."
                      rows="3"
                    />
                  </div>
                  <div className="form-actions">
                    <button className="secondary-btn" onClick={() => setShowClassForm(false)}>
                      Annuler
                    </button>
                    <button className="primary-btn" onClick={createClass} disabled={!newClass.name.trim()}>
                      Créer
                    </button>
                  </div>
                </div>
              )}

              <div className="classes-grid">
                {filteredClasses.map(cls => (
                  <div key={cls.id} className="class-card">
                    <div className="class-header">
                      <div className="class-icon">
                        <FiBook />
                      </div>
                      <div className="class-info">
                        <h3>{cls.name}</h3>
                        <p className="class-code">{cls.code}</p>
                        <p>{cls.description}</p>
                      </div>
                    </div>
                    <div className="class-stats">
                      <div className="stat">
                        <FiUser />
                        <span>{cls.students} Étudiants</span>
                      </div>
                      <div className="stat">
                        <AiOutlineTeam />
                        <span>{cls.groups} Groupes</span>
                      </div>
                    </div>
                    <div className="class-actions">
                      <button 
                        className="secondary-btn"
                        onClick={() => {
                          setSelectedClass(cls);
                          setActiveTab('students');
                        }}
                      >
                        Voir étudiants
                      </button>
                      <button 
                        className="primary-btn"
                        onClick={() => {
                          setSelectedClass(cls);
                          setActiveTab('groups');
                        }}
                      >
                        Voir groupes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="students-tab">
              <div className="section-header">
                <h2>Gestion des Étudiants</h2>
                <div className="actions">
                  <button className="primary-btn" onClick={() => setShowStudentForm(true)}>
                    <FiUsers /> Ajouter étudiant
                  </button>
                </div>
              </div>

              {showStudentForm && (
                <div className="modal-form">
                  <div className="modal-header">
                    <h3>Ajouter un nouvel étudiant</h3>
                    <button className="close-btn" onClick={() => setShowStudentForm(false)}>
                      &times;
                    </button>
                  </div>
                  <div className="form-group">
                    <label>Nom complet</label>
                    <input 
                      type="text" 
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                      placeholder="Ex: Alice Koné"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                      placeholder="Ex: alice@ista.edu"
                    />
                  </div>
                  <div className="form-group">
                    <label>Classe</label>
                    <select
                      value={newStudent.class}
                      onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
                    >
                      <option value="">Sélectionner une classe</option>
                      {classes.map(cls => (
                        <option key={cls.id} value={cls.name}>{cls.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-actions">
                    <button className="secondary-btn" onClick={() => setShowStudentForm(false)}>
                      Annuler
                    </button>
                    <button 
                      className="primary-btn" 
                      onClick={addStudent}
                      disabled={!newStudent.name.trim() || !newStudent.email.trim() || !newStudent.class}
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              )}

              <div className="students-table-container">
                <table className="students-table">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Email</th>
                      <th>Classe</th>
                      <th>Groupe</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map(student => (
                      <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.class}</td>
                        <td>
                          <select 
                            value={student.group}
                            onChange={(e) => {
                              // Fonction pour assigner l'étudiant à un groupe
                              const updatedStudents = students.map(s => 
                                s.id === student.id ? {...s, group: e.target.value} : s
                              );
                              setStudents(updatedStudents);
                            }}
                          >
                            <option value="Non assigné">Non assigné</option>
                            {groups.map(group => (
                              <option key={group.id} value={group.name}>{group.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="actions">
                          <button className="icon-btn">
                            <FiEdit2 />
                          </button>
                          <button className="icon-btn danger">
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Groups Tab */}
          {activeTab === 'groups' && (
            <div className="groups-tab">
              <div className="section-header">
                <h2>Gestion des Groupes</h2>
                <div className="actions">
                  <button className="primary-btn" onClick={() => setShowGroupForm(true)}>
                    <FiPlus /> Nouveau groupe
                  </button>
                </div>
              </div>

              {showGroupForm && (
                <div className="modal-form">
                  <div className="modal-header">
                    <h3>Créer un nouveau groupe</h3>
                    <button className="close-btn" onClick={() => setShowGroupForm(false)}>
                      &times;
                    </button>
                  </div>
                  <div className="form-group">
                    <label>Nom du groupe</label>
                    <input 
                      type="text" 
                      value={newGroup.name}
                      onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                      placeholder="Ex: Groupe Alpha"
                    />
                  </div>
                  <div className="form-group">
                    <label>Classe</label>
                    <select
                      value={newGroup.class}
                      onChange={(e) => setNewGroup({...newGroup, class: e.target.value})}
                    >
                      <option value="">Sélectionner une classe</option>
                      {classes.map(cls => (
                        <option key={cls.id} value={cls.name}>{cls.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Coordinateur</label>
                    <select
                      value={newGroup.coordinator}
                      onChange={(e) => setNewGroup({...newGroup, coordinator: e.target.value})}
                    >
                      <option value="">Sélectionner un coordinateur</option>
                      {students.map(student => (
                        <option key={student.id} value={student.name}>{student.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-actions">
                    <button className="secondary-btn" onClick={() => setShowGroupForm(false)}>
                      Annuler
                    </button>
                    <button 
                      className="primary-btn" 
                      onClick={createGroup}
                      disabled={!newGroup.name.trim() || !newGroup.class || !newGroup.coordinator}
                    >
                      Créer
                    </button>
                  </div>
                </div>
              )}

              <div className="groups-container">
                <div className="groups-list">
                  {filteredGroups.map(group => (
                    <div 
                      key={group.id} 
                      className={`group-card ${selectedGroup?.id === group.id ? 'selected' : ''}`}
                      onClick={() => setSelectedGroup(group)}
                    >
                      <div className="group-avatar">{group.name.charAt(0)}</div>
                      <div className="group-info">
                        <h3>{group.name}</h3>
                        <p className="class-name">{group.class}</p>
                        <p className="coordinator">Coordinateur: {group.coordinator}</p>
                        <div className="progress-container">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${group.progress}%` }}
                            ></div>
                          </div>
                          <span>{group.progress}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedGroup && (
                  <div className="group-details">
                    <div className="detail-header">
                      <h3>{selectedGroup.name}</h3>
                      <div className="header-actions">
                        <button className="icon-btn">
                          <FiEdit2 />
                        </button>
                        <button className="icon-btn danger">
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>

                    <div className="detail-section">
                      <h4>Informations</h4>
                      <div className="info-grid">
                        <div className="info-item">
                          <span className="info-label">Classe</span>
                          <span className="info-value">{selectedGroup.class}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Coordinateur</span>
                          <span className="info-value">{selectedGroup.coordinator}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Progression</span>
                          <span className="info-value">{selectedGroup.progress}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="detail-section">
                      <div className="section-header">
                        <h4>Membres ({selectedGroup.members.length})</h4>
                        <button className="text-btn">
                          <FiUsers /> Ajouter membre
                        </button>
                      </div>
                      <div className="members-list">
                        {selectedGroup.members.map((member, index) => (
                          <div key={index} className="member-item">
                            <div className="member-avatar">
                              {member.charAt(0)}
                            </div>
                            <span className="member-name">{member}</span>
                            {member === selectedGroup.coordinator && (
                              <span className="coordinator-badge">Coordinateur</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="detail-section">
                      <h4>Jalons du projet</h4>
                      <div className="milestones-list">
                        {selectedGroup.milestones.map((milestone, index) => (
                          <div 
                            key={index} 
                            className={`milestone-item ${milestone.completed ? 'completed' : ''}`}
                            onClick={() => toggleMilestone(selectedGroup.id, milestone.name)}
                          >
                            <div className="milestone-checkbox">
                              {milestone.completed ? <BsCheckCircleFill /> : <div className="empty-circle" />}
                            </div>
                            <div className="milestone-info">
                              <h5>{milestone.name}</h5>
                              {milestone.date && (
                                <p className="milestone-date">Terminé le: {milestone.date}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <div className="tasks-tab">
              <div className="section-header">
                <h2>Tâches et Travaux</h2>
                <button className="primary-btn" onClick={() => setShowTaskForm(true)}>
                  <FiPlus /> Nouvelle tâche
                </button>
              </div>

              {showTaskForm && (
                <div className="modal-form">
                  <div className="modal-header">
                    <h3>Créer une nouvelle tâche</h3>
                    <button className="close-btn" onClick={() => setShowTaskForm(false)}>
                      &times;
                    </button>
                  </div>
                  <div className="form-group">
                    <label>Titre de la tâche</label>
                    <input 
                      type="text" 
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      placeholder="Ex: Soumettre le chapitre 1"
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={newTask.description}
                      onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                      placeholder="Description détaillée de la tâche..."
                      rows="3"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Date limite</label>
                      <input 
                        type="date" 
                        value={newTask.deadline}
                        onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Destinataires</label>
                      <select
                        value={newTask.forGroup}
                        onChange={(e) => setNewTask({...newTask, forGroup: e.target.value})}
                      >
                        <option value="all">Tous les groupes</option>
                        {groups.map(group => (
                          <option key={group.id} value={group.name}>{group.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Document (optionnel)</label>
                    <div className="file-upload">
                      <label className="upload-btn">
                        <FiUpload /> Choisir un fichier
                        <input 
                          type="file" 
                          onChange={(e) => setNewTask({...newTask, file: e.target.files[0]})}
                          hidden
                        />
                      </label>
                      {newTask.file && (
                        <span className="file-name">
                          {newTask.file.name}
                          <button 
                            className="remove-file"
                            onClick={() => setNewTask({...newTask, file: null})}
                          >
                            &times;
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="form-actions">
                    <button className="secondary-btn" onClick={() => setShowTaskForm(false)}>
                      Annuler
                    </button>
                    <button 
                      className="primary-btn" 
                      onClick={assignTask}
                      disabled={!newTask.title.trim() || !newTask.deadline}
                    >
                      Publier
                    </button>
                  </div>
                </div>
              )}

              <div className="tasks-list">
                <div className="filters">
                  <button className="filter-btn active">Toutes</button>
                  <button className="filter-btn">En cours</button>
                  <button className="filter-btn">Soumises</button>
                  <button className="filter-btn">Corrigées</button>
                </div>

                {filteredTasks.map(task => (
                  <div key={task.id} className="task-card">
                    <div className="task-header">
                      <h3>{task.title}</h3>
                      <div className="task-meta">
                        <span className="group-badge">
                          {task.group === 'all' ? 'Tous groupes' : task.group}
                        </span>
                        <span className="deadline">
                          <FiCalendar /> {task.deadline}
                        </span>
                      </div>
                    </div>
                    <p className="task-description">{task.description}</p>
                    <div className="task-footer">
                      <div className="submission-info">
                        <div className="submission-count">
                          {task.submissions.length} soumission{task.submissions.length !== 1 ? 's' : ''}
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ 
                              width: `${(task.submissions.length / 
                                (task.group === 'all' ? groups.length : 1)) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="task-actions">
                        <button 
                          className="secondary-btn"
                          onClick={() => {
                            setSelectedTask(task);
                            // Ici vous pourriez ouvrir un modal de correction
                          }}
                        >
                          Corriger
                        </button>
                        <button 
                          className="primary-btn"
                          onClick={() => {
                            setSelectedTask(task);
                            // Ici vous pourriez ouvrir un modal avec les détails
                          }}
                        >
                          Voir détails
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && (
            <div className="progress-tab">
              <div className="section-header">
                <h2>Progression des Groupes</h2>
                <div className="filters">
                  <button className="filter-btn active">Tous</button>
                  <button className="filter-btn">En retard</button>
                  <button className="filter-btn">À jour</button>
                </div>
              </div>

              <div className="progress-grid">
                {groups.map(group => (
                  <div key={group.id} className="progress-card">
                    <div className="progress-header">
                      <div className="group-avatar">{group.name.charAt(0)}</div>
                      <div className="group-info">
                        <h3>{group.name}</h3>
                        <p className="class-name">{group.class}</p>
                        <p className="coordinator">Coordinateur: {group.coordinator}</p>
                      </div>
                    </div>
                    <div className="progress-container">
                      <div className="progress-labels">
                        <span>Progression globale</span>
                        <span>{group.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${group.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="milestones">
                      {group.milestones.map((milestone, index) => (
                        <div 
                          key={index} 
                          className={`milestone ${milestone.completed ? 'completed' : ''}`}
                          onClick={() => toggleMilestone(group.id, milestone.name)}
                        >
                          <div className="milestone-icon">
                            {milestone.completed ? <BsCheckCircleFill /> : index + 1}
                          </div>
                          <div className="milestone-info">
                            <span>{milestone.name}</span>
                            {milestone.date && <small>{milestone.date}</small>}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="progress-actions">
                      <button 
                        className="secondary-btn"
                        onClick={() => {
                          setSelectedGroup(group);
                          setActiveTab('groups');
                        }}
                      >
                        Voir groupe
                      </button>
                      <button 
                        className="primary-btn"
                        onClick={() => {
                          setSelectedGroup(group);
                          setActiveTab('tasks');
                        }}
                      >
                        Voir tâches
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Announcements Tab */}
          {activeTab === 'announcements' && (
            <div className="announcements-tab">
              <div className="section-header">
                <h2>Annonces</h2>
                <button className="primary-btn" onClick={() => setShowAnnouncementForm(true)}>
                  <FiPlus /> Nouvelle annonce
                </button>
              </div>

              {showAnnouncementForm && (
                <div className="modal-form">
                  <div className="modal-header">
                    <h3>Créer une nouvelle annonce</h3>
                    <button className="close-btn" onClick={() => setShowAnnouncementForm(false)}>
                      &times;
                    </button>
                  </div>
                  <div className="form-group">
                    <textarea
                      value={newAnnouncement}
                      onChange={(e) => setNewAnnouncement(e.target.value)}
                      placeholder="Écrivez votre annonce ici..."
                      rows="5"
                    />
                  </div>
                  <div className="form-actions">
                    <button className="secondary-btn" onClick={() => setShowAnnouncementForm(false)}>
                      Annuler
                    </button>
                    <button 
                      className="primary-btn" 
                      onClick={publishAnnouncement}
                      disabled={!newAnnouncement.trim()}
                    >
                      Publier
                    </button>
                  </div>
                </div>
              )}

              <div className="announcements-list">
                {announcements.map(announcement => (
                  <div key={announcement.id} className="announcement-card">
                    <div className="announcement-header">
                      <div className="author-avatar">
                        {announcement.author.charAt(0)}
                      </div>
                      <div className="announcement-meta">
                        <span className="author">{announcement.author}</span>
                        <span className="date">{announcement.date}</span>
                      </div>
                      {announcement.important && (
                        <span className="important-badge">Important</span>
                      )}
                    </div>
                    <div className="announcement-content">
                      <p>{announcement.content}</p>
                    </div>
                    <div className="announcement-actions">
                      <button className="text-btn">
                        <FiMessageSquare /> Commenter
                      </button>
                      <button className="text-btn">
                        <FiSend /> Partager
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="documents-tab">
              <div className="section-header">
                <h2>Documents Partagés</h2>
                <div className="actions">
                  <label className="primary-btn">
                    <FiUpload /> Téléverser
                    <input 
                      type="file" 
                      onChange={uploadDocument}
                      hidden
                    />
                  </label>
                </div>
              </div>

              <div className="documents-table-container">
                <table className="documents-table">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Type</th>
                      <th>Taille</th>
                      <th>Date</th>
                      <th>Groupe</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map(doc => (
                      <tr key={doc.id}>
                        <td>
                          <div className="document-info">
                            <div className={`file-icon ${doc.type}`}>
                              {doc.type === 'pdf' ? 'PDF' : doc.type === 'doc' ? 'DOC' : 'FILE'}
                            </div>
                            <span>{doc.name}</span>
                          </div>
                        </td>
                        <td>{doc.type.toUpperCase()}</td>
                        <td>{doc.size}</td>
                        <td>{doc.date}</td>
                        <td>{doc.group === 'all' ? 'Tous' : doc.group}</td>
                        <td>
                          <div className="document-actions">
                            <button className="icon-btn">
                              <FiDownload />
                            </button>
                            <button className="icon-btn danger">
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="messages-tab">
              <div className="messages-container">
                <div className="conversations-list">
                  <div className="section-header">
                    <h2>Conversations</h2>
                    <button 
                      className="primary-btn small"
                      onClick={() => setSelectedMessage(null)}
                    >
                      <FiPlus /> Nouveau
                    </button>
                  </div>
                  <div className="conversation-filters">
                    <button className="filter-btn active">Tous</button>
                    <button className="filter-btn">Publics</button>
                    <button className="filter-btn">Privés</button>
                  </div>
                  <div className="conversations">
                    {messages.map(message => (
                      <div 
                        key={message.id} 
                        className={`conversation-item ${selectedMessage?.id === message.id ? 'active' : ''}`}
                        onClick={() => setSelectedMessage(message)}
                      >
                        <div className="conversation-avatar">
                          {message.isPrivate ? message.sender?.charAt(0) : 'A'}
                        </div>
                        <div className="conversation-info">
                          <div className="conversation-header">
                            <span className="sender">
                              {message.isPrivate ? message.sender : 'Annonce publique'}
                            </span>
                            <span className="date">{message.date}</span>
                          </div>
                          <p className="message-preview">
                            {message.content.length > 50 
                              ? `${message.content.substring(0, 50)}...` 
                              : message.content}
                          </p>
                          {message.isPrivate && <span className="private-badge">Privé</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="conversation-detail">
                  {selectedMessage ? (
                    <>
                      <div className="message-header">
                        <div className="recipient-info">
                          <div className="avatar">
                            {selectedMessage.isPrivate ? selectedMessage.sender?.charAt(0) : 'A'}
                          </div>
                          <div>
                            <h3>
                              {selectedMessage.isPrivate ? selectedMessage.sender : 'Annonce publique'}
                            </h3>
                            <p className="message-date">{selectedMessage.date}</p>
                          </div>
                        </div>
                        <div className="message-actions">
                          <button className="icon-btn">
                            <BsThreeDotsVertical />
                          </button>
                        </div>
                      </div>
                      <div className="message-content">
                        <p>{selectedMessage.content}</p>
                        {selectedMessage.replies.length > 0 && (
                          <div className="replies-list">
                            {selectedMessage.replies.map((reply, index) => (
                              <div key={index} className="reply-item">
                                <div className="reply-avatar">
                                  {reply.sender.charAt(0)}
                                </div>
                                <div className="reply-content">
                                  <div className="reply-header">
                                    <span className="reply-sender">{reply.sender}</span>
                                    <span className="reply-date">{reply.date}</span>
                                  </div>
                                  <p>{reply.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="message-reply">
                        <textarea 
                          placeholder="Écrivez votre réponse..."
                          rows="3"
                        ></textarea>
                        <div className="reply-actions">
                          <button className="icon-btn">
                            <FiPaperclip />
                          </button>
                          <button className="primary-btn">
                            <FiSend /> Envoyer
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="new-message">
                      <div className="empty-state">
                        <FiMessageSquare size={48} />
                        <h3>Nouveau message</h3>
                        <p>Envoyez un message à un groupe ou à tous vos étudiants</p>
                      </div>
                      <div className="message-form">
                        <div className="form-group">
                          <label>Destinataire</label>
                          <select>
                            <option value="">Sélectionner un groupe</option>
                            {groups.map(group => (
                              <option key={group.id} value={group.id}>{group.name}</option>
                            ))}
                            <option value="all">Tous les groupes</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Message</label>
                          <textarea rows="5" placeholder="Écrivez votre message ici..."></textarea>
                        </div>
                        <div className="form-actions">
                          <button className="secondary-btn">
                            Annuler
                          </button>
                          <button className="primary-btn">
                            <FiSend /> Envoyer
                          </button>
                        </div>
                      </div>
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

export default TeacherDashboard;