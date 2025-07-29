import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiMenu, FiBell, FiMessageSquare, FiUsers, FiFileText, 
  FiCheckCircle, FiUpload, FiPlus, FiSearch, FiDownload, 
  FiSend, FiEdit2, FiFile, FiTrash2, FiPaperclip, FiUserPlus,
  FiBook, FiHome, FiCalendar, FiClipboard, FiAward, FiChevronDown
} from 'react-icons/fi';
import { BsThreeDotsVertical, BsCheckCircleFill, BsPeopleFill } from 'react-icons/bs';
import { RiProgress5Line, RiFeedbackLine } from 'react-icons/ri';
import { MdOutlineClass, MdOutlineAssignmentTurnedIn } from 'react-icons/md';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  // États principaux
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    deadline: '',
    forGroup: 'all',
    file: null
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [newClass, setNewClass] = useState({ name: '', description: '' });
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [showTaskCorrection, setShowTaskCorrection] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [grade, setGrade] = useState('');
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    class: '',
    group: 'Non assigné'
  });
  const [showNewStudentForm, setShowNewStudentForm] = useState(false);
  const [showNewClassForm, setShowNewClassForm] = useState(false);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [showNewAnnouncementForm, setShowNewAnnouncementForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Chargement des données initiales
  useEffect(() => {
    const mockData = {
      groups: [
        { 
          id: 1, 
          name: 'Groupe Alpha', 
          coordinator: 'Alice Koné', 
          members: ['Alice Koné', 'Bob Diarra', 'Charlie Traoré'], 
          progress: 65,
          avatarColor: '#7F5AF0',
          lastActivity: 'Il y a 2 heures',
          milestones: [
            { name: 'Proposition de sujet', completed: true, date: '2024-01-15' },
            { name: 'Chapitre 1', completed: true, date: '2024-03-10' },
            { name: 'Chapitre 2', completed: false },
            { name: 'Chapitre 3', completed: false },
            { name: 'Soutenance', completed: false }
          ]
        },
        { 
          id: 2, 
          name: 'Groupe Beta', 
          coordinator: 'David Coulibaly', 
          members: ['David Coulibaly', 'Eva Diallo', 'Frank Keita'], 
          progress: 40,
          avatarColor: '#2CB67D',
          lastActivity: 'Aujourd\'hui',
          milestones: [
            { name: 'Proposition de sujet', completed: true, date: '2024-02-01' },
            { name: 'Chapitre 1', completed: false },
            { name: 'Chapitre 2', completed: false },
            { name: 'Chapitre 3', completed: false },
            { name: 'Soutenance', completed: false }
          ]
        },
      ],
      tasks: [
        { 
          id: 1, 
          title: 'Soumettre le chapitre 1', 
          group: 'all', 
          deadline: '2024-06-15', 
          submitted: ['Groupe Alpha', 'Groupe Gamma'],
          status: 'submitted',
          description: 'Rédiger le premier chapitre du mémoire avec la problématique et les objectifs de recherche.',
          submissions: [
            {
              groupId: 1,
              file: 'Chapitre1_GroupeAlpha.pdf',
              date: '2024-06-14',
              grade: null,
              feedback: null
            }
          ]
        },
        { 
          id: 2, 
          title: 'Proposition de sujet', 
          group: 'Groupe Beta', 
          deadline: '2024-05-10', 
          submitted: ['Groupe Beta'],
          status: 'submitted',
          description: 'Soumettre une proposition de sujet détaillée avec les objectifs et méthodologie.',
          submissions: [
            {
              groupId: 2,
              file: 'Proposition_GroupeBeta.pdf',
              date: '2024-05-08',
              grade: '16/20',
              feedback: 'Bonne proposition mais méthodologie à préciser'
            }
          ]
        }
      ],
      announcements: [
        {
          id: 1,
          content: 'La date limite pour le chapitre 1 a été prolongée jusqu\'au 20 juin',
          date: '2024-05-25',
          author: 'Dr. H. Kassogue',
          important: true
        },
        {
          id: 2,
          content: 'Réunion de suivi demain à 10h en salle B12',
          date: '2024-06-10',
          author: 'Dr. H. Kassogue',
          important: false
        }
      ],
      documents: [
        {
          id: 1,
          name: 'Guide du mémoire.pdf',
          size: '2.4 MB',
          date: '2024-05-10',
          group: 'all',
          type: 'pdf'
        },
        {
          id: 2,
          name: 'Template mémoire.docx',
          size: '1.2 MB',
          date: '2024-05-12',
          group: 'all',
          type: 'doc'
        }
      ],
      messages: [
        {
          id: 1,
          sender: 'Groupe Alpha',
          content: 'Nous avons une question sur le chapitre 2. Pourrions-nous avoir un rendez-vous cette semaine ?',
          date: '2024-06-12 10:30',
          isPrivate: true,
          read: false,
          replies: []
        },
        {
          id: 2,
          content: 'Rappel : Tous les groupes doivent soumettre leur plan de travail avant vendredi.',
          date: '2024-06-15 14:00',
          isPrivate: false,
          read: true,
          replies: [
            {
              sender: 'Groupe Beta',
              content: 'Nous avons soumis notre plan hier.',
              date: '2024-06-15 16:30'
            }
          ]
        }
      ],
      classes: [
        {
          id: 1,
          name: 'Mémoire de Fin d\'Études',
          description: 'Encadrement des mémoires de fin d\'études',
          students: 15,
          groups: 5,
          code: 'MFE-2024'
        },
        {
          id: 2,
          name: 'Projet Intégrateur',
          description: 'Gestion de projets technologiques',
          students: 20,
          groups: 6,
          code: 'PI-2024'
        }
      ],
      students: [
        {
          id: 1,
          name: 'Alice Koné',
          email: 'alice@ista.edu',
          class: 'Mémoire de Fin d\'Études',
          group: 'Groupe Alpha'
        },
        {
          id: 2,
          name: 'Bob Diarra',
          email: 'bob@ista.edu',
          class: 'Mémoire de Fin d\'Études',
          group: 'Groupe Alpha'
        },
        {
          id: 3,
          name: 'David Coulibaly',
          email: 'david@ista.edu',
          class: 'Mémoire de Fin d\'Études',
          group: 'Groupe Beta'
        },
        {
          id: 4,
          name: 'Eva Diallo',
          email: 'eva@ista.edu',
          class: 'Projet Intégrateur',
          group: 'Non assigné'
        }
      ],
      notifications: [
        {
          id: 1,
          title: 'Nouvelle soumission',
          content: 'Le Groupe Alpha a soumis le chapitre 1',
          date: '2024-06-14 15:30',
          read: false,
          type: 'submission'
        },
        {
          id: 2,
          title: 'Message privé',
          content: 'Vous avez reçu un message du Groupe Beta',
          date: '2024-06-13 09:15',
          read: false,
          type: 'message'
        }
      ]
    };

    setGroups(mockData.groups);
    setTasks(mockData.tasks);
    setAnnouncements(mockData.announcements);
    setDocuments(mockData.documents);
    setMessages(mockData.messages);
    setClasses(mockData.classes);
    setStudents(mockData.students);
    setNotifications(mockData.notifications);
  }, []);

  // Fonctionnalités principales

  // 1. Gestion des classes
  const handleCreateClass = () => {
    if (!newClass.name.trim()) return;
    
    const newClassObj = {
      id: classes.length + 1,
      ...newClass,
      code: `CLS-${Math.floor(1000 + Math.random() * 9000)}`,
      students: 0,
      groups: 0,
      createdAt: new Date().toISOString()
    };
    
    setClasses([...classes, newClassObj]);
    setNewClass({ name: '', description: '' });
    setShowNewClassForm(false);
  };

  // 2. Gestion des étudiants
  const handleAddStudent = () => {
    if (!newStudent.name.trim() || !newStudent.email.trim()) return;
    
    const newStudentObj = {
      id: students.length + 1,
      ...newStudent,
      createdAt: new Date().toISOString()
    };
    
    setStudents([...students, newStudentObj]);
    
    // Mettre à jour le compte d'étudiants dans la classe
    if (newStudent.class) {
      const updatedClasses = classes.map(cls => 
        cls.name === newStudent.class 
          ? { ...cls, students: cls.students + 1 } 
          : cls
      );
      setClasses(updatedClasses);
    }
    
    setNewStudent({ name: '', email: '', class: classes[0]?.name || '', group: 'Non assigné' });
    setShowNewStudentForm(false);
  };

  // 3. Gestion des groupes
  const handleCreateGroup = () => {
    const colors = ['#7F5AF0', '#2CB67D', '#FF7E6B', '#6B66FF', '#F9C74F'];
    const newGroup = {
      id: groups.length + 1,
      name: `Groupe ${groups.length + 1}`,
      coordinator: '',
      members: [],
      progress: 0,
      avatarColor: colors[groups.length % colors.length],
      lastActivity: 'Maintenant',
      milestones: [
        { name: 'Proposition de sujet', completed: false },
        { name: 'Chapitre 1', completed: false },
        { name: 'Chapitre 2', completed: false },
        { name: 'Chapitre 3', completed: false },
        { name: 'Soutenance', completed: false }
      ],
      createdAt: new Date().toISOString()
    };
    
    setGroups([...groups, newGroup]);
    setSelectedGroup(newGroup);
    
    // Mettre à jour le compte de groupes dans la classe
    if (classes.length > 0) {
      const updatedClasses = classes.map(cls => ({
        ...cls,
        groups: cls.groups + 1
      }));
      setClasses(updatedClasses);
    }
  };

  // 4. Publication d'annonces
  const handlePublishAnnouncement = () => {
    if (!newAnnouncement.trim()) return;
    
    const newAnnouncementObj = {
      id: announcements.length + 1,
      content: newAnnouncement,
      date: new Date().toLocaleDateString(),
      author: 'Dr. H. Kassogue',
      important: false,
      createdAt: new Date().toISOString()
    };
    
    setAnnouncements([newAnnouncementObj, ...announcements]);
    setNewAnnouncement('');
    setShowNewAnnouncementForm(false);
  };

  // 5. Partage de documents
  const handleUploadDocument = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const newDoc = {
      id: documents.length + 1,
      name: file.name,
      date: new Date().toLocaleDateString(),
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      group: selectedGroup?.name || 'all',
      type: file.name.split('.').pop(),
      createdAt: new Date().toISOString()
    };
    
    setDocuments([...documents, newDoc]);
    e.target.value = null; // Reset file input
  };

  // 6. Assignation de tâches
  const handleCreateTask = () => {
    if (!newTask.title.trim() || !newTask.deadline) return;
    
    const task = {
      id: tasks.length + 1,
      ...newTask,
      submitted: [],
      status: 'pending',
      submissions: [],
      createdAt: new Date().toISOString()
    };
    
    setTasks([...tasks, task]);
    setNewTask({ 
      title: '', 
      description: '', 
      deadline: '', 
      forGroup: 'all',
      file: null 
    });
    setShowNewTaskForm(false);
  };

  // 7. Correction de travaux
  const handleSubmitCorrection = () => {
    if (!selectedTask || !selectedGroup || !feedback) return;
    
    const updatedTasks = tasks.map(task => {
      if (task.id === selectedTask.id) {
        const updatedSubmissions = task.submissions.map(sub => {
          if (sub.groupId === selectedGroup.id) {
            return { ...sub, grade, feedback };
          }
          return sub;
        });
        
        // Si aucune soumission existante, en créer une nouvelle
        if (updatedSubmissions.length === 0) {
          updatedSubmissions.push({
            groupId: selectedGroup.id,
            file: 'Corrigé_enseignant.pdf',
            date: new Date().toLocaleDateString(),
            grade,
            feedback
          });
        }
        
        return {
          ...task,
          submissions: updatedSubmissions
        };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    setShowTaskCorrection(false);
    setFeedback('');
    setGrade('');
  };

  // 8. Messagerie
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const isPrivate = !!selectedGroup;
    const newMsg = {
      id: messages.length + 1,
      sender: isPrivate ? 'Dr. H. Kassogue' : null,
      recipient: isPrivate ? selectedGroup.name : null,
      content: newMessage,
      date: new Date().toLocaleString(),
      isPrivate,
      read: false,
      replies: [],
      createdAt: new Date().toISOString()
    };
    
    setMessages([newMsg, ...messages]);
    setNewMessage('');
  };

  // 9. Suivi de progression
  const updateGroupProgress = (groupId, progress) => {
    setGroups(groups.map(group => 
      group.id === groupId ? { ...group, progress } : group
    ));
  };

  // 10. Gestion des étudiants dans les groupes
  const handleAddStudentToGroup = (studentId, groupId) => {
    const group = groups.find(g => g.id === groupId);
    const student = students.find(s => s.id === studentId);
    
    if (!group || !student) return;
    
    // Retirer l'étudiant de son groupe actuel s'il en a un
    const previousGroup = groups.find(g => g.members.includes(student.name));
    if (previousGroup) {
      const updatedPreviousGroup = {
        ...previousGroup,
        members: previousGroup.members.filter(m => m !== student.name)
      };
      setGroups(groups.map(g => g.id === previousGroup.id ? updatedPreviousGroup : g));
    }
    
    // Ajouter l'étudiant au nouveau groupe
    const updatedGroups = groups.map(g => 
      g.id === groupId 
        ? { ...g, members: [...g.members, student.name] } 
        : g
    );
    
    // Mettre à jour l'affectation de l'étudiant
    const updatedStudents = students.map(s => 
      s.id === studentId ? { ...s, group: group.name } : s
    );
    
    setGroups(updatedGroups);
    setStudents(updatedStudents);
    
    // Mettre à jour le groupe sélectionné si nécessaire
    if (selectedGroup?.id === groupId) {
      setSelectedGroup(updatedGroups.find(g => g.id === groupId));
    }
  };

  // 11. Marquer une notification comme lue
  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  // 12. Marquer un jalon comme terminé
  const toggleMilestoneCompletion = (groupId, milestoneName) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        const updatedMilestones = group.milestones.map(m => 
          m.name === milestoneName 
            ? { ...m, completed: !m.completed, date: m.completed ? null : new Date().toLocaleDateString() } 
            : m
        );
        
        // Recalculer la progression
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

  // Fonctions utilitaires
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.coordinator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <div className={`teacher-dashboard ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="app-logo">
            <span className="logo-icon">ISTA</span>
            <span className="logo-text">Teacher Dashboard</span>
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
              <span>Classes/Modules</span>
            </li>
            <li 
              className={activeTab === 'students' ? 'active' : ''} 
              onClick={() => setActiveTab('students')}
            >
              <BsPeopleFill className="nav-icon" />
              <span>Étudiants</span>
            </li>
            <li 
              className={activeTab === 'groups' ? 'active' : ''} 
              onClick={() => setActiveTab('groups')}
            >
              <FiUsers className="nav-icon" />
              <span>Groupes</span>
            </li>
            <li 
              className={activeTab === 'tasks' ? 'active' : ''} 
              onClick={() => setActiveTab('tasks')}
            >
              <MdOutlineAssignmentTurnedIn className="nav-icon" />
              <span>Tâches</span>
            </li>
            <li 
              className={activeTab === 'progress' ? 'active' : ''} 
              onClick={() => setActiveTab('progress')}
            >
              <RiProgress5Line className="nav-icon" />
              <span>Progression</span>
            </li>
            <li 
              className={activeTab === 'messages' ? 'active' : ''} 
              onClick={() => setActiveTab('messages')}
            >
              <FiMessageSquare className="nav-icon" />
              <span>Messages</span>
              {messages.filter(m => !m.read && m.isPrivate).length > 0 && (
                <span className="badge">{messages.filter(m => !m.read && m.isPrivate).length}</span>
              )}
            </li>
            <li 
              className={activeTab === 'announcements' ? 'active' : ''} 
              onClick={() => setActiveTab('announcements')}
            >
              <FiBell className="nav-icon" />
              <span>Annonces</span>
            </li>
            <li 
              className={activeTab === 'documents' ? 'active' : ''} 
              onClick={() => setActiveTab('documents')}
            >
              <FiFile className="nav-icon" />
              <span>Documents</span>
            </li>
          </ul>
        </nav>

        <div className="user-profile">
          <div className="avatar">HK</div>
          <div className="user-info">
            <span className="name">Dr. H. Kassogue</span>
            <span className="role">Enseignant</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header>
          <div className="header-left">
            <h1>
              {activeTab === 'dashboard' && 'Tableau de bord'}
              {activeTab === 'classes' && 'Gestion des Classes/Modules'}
              {activeTab === 'students' && 'Gestion des Étudiants'}
              {activeTab === 'groups' && 'Gestion des Groupes'}
              {activeTab === 'tasks' && 'Tâches et Travaux'}
              {activeTab === 'progress' && 'Suivi de Progression'}
              {activeTab === 'messages' && 'Messagerie'}
              {activeTab === 'announcements' && 'Annonces'}
              {activeTab === 'documents' && 'Documents partagés'}
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
            <div className="notifications-container">
              <button 
                className="icon-button notification-badge" 
                data-count={unreadNotificationsCount}
                onClick={() => setActiveTab('notifications')}
              >
                <FiBell />
              </button>
              {activeTab === 'notifications' && (
                <div className="notifications-dropdown">
                  <div className="dropdown-header">
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
                          {notification.type === 'submission' ? <FiUpload /> : <FiMessageSquare />}
                        </div>
                        <div className="notification-content">
                          <h4>{notification.title}</h4>
                          <p>{notification.content}</p>
                          <span className="notification-time">{notification.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="dropdown-footer">
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
              <div className="stats-row">
                <div className="stat-card">
                  <div className="stat-icon" style={{ backgroundColor: '#7F5AF0' }}>
                    <MdOutlineClass size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{classes.length}</h3>
                    <p>Classes/Modules</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon" style={{ backgroundColor: '#2CB67D' }}>
                    <BsPeopleFill size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{students.length}</h3>
                    <p>Étudiants</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon" style={{ backgroundColor: '#FF7E6B' }}>
                    <FiUsers size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{groups.length}</h3>
                    <p>Groupes</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon" style={{ backgroundColor: '#6B66FF' }}>
                    <MdOutlineAssignmentTurnedIn size={24} />
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
                    <button 
                      className="text-button"
                      onClick={() => setActiveTab('announcements')}
                    >
                      Voir tout
                    </button>
                  </div>
                  <div className="announcements-preview">
                    {announcements.slice(0, 3).map(announcement => (
                      <div key={announcement.id} className="announcement-item">
                        <div className="announcement-content">
                          <p>{announcement.content}</p>
                          <span className="announcement-date">{announcement.date}</span>
                        </div>
                        {announcement.important && (
                          <div className="important-badge">Important</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="dashboard-section">
                  <div className="section-header">
                    <h2>Tâches récentes</h2>
                    <button 
                      className="text-button"
                      onClick={() => setActiveTab('tasks')}
                    >
                      Voir tout
                    </button>
                  </div>
                  <div className="tasks-preview">
                    {tasks.slice(0, 3).map(task => (
                      <div key={task.id} className="task-item">
                        <div className="task-info">
                          <h4>{task.title}</h4>
                          <p>Pour: {task.group === 'all' ? 'Tous les groupes' : task.group}</p>
                          <span className="task-deadline">
                            <FiCalendar /> {task.deadline}
                          </span>
                        </div>
                        <div className="task-status">
                          <div className="submission-count">
                            {task.submitted.length}/{groups.length} soumissions
                          </div>
                          <button 
                            className="small-button"
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
                    <button 
                      className="text-button"
                      onClick={() => setActiveTab('progress')}
                    >
                      Voir tout
                    </button>
                  </div>
                  <div className="progress-preview">
                    {groups.slice(0, 3).map(group => (
                      <div key={group.id} className="progress-item">
                        <div className="group-info">
                          <div 
                            className="group-avatar" 
                            style={{ backgroundColor: group.avatarColor }}
                          >
                            {group.name.charAt(0)}
                          </div>
                          <h4>{group.name}</h4>
                        </div>
                        <div className="progress-bar-container">
                          <div className="progress-labels">
                            <span>Progression</span>
                            <span>{group.progress}%</span>
                          </div>
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${group.progress}%` }}
                            ></div>
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
                <h2>Vos Classes/Modules</h2>
                <button 
                  className="primary-button"
                  onClick={() => setShowNewClassForm(true)}
                >
                  <FiPlus /> Nouvelle classe
                </button>
              </div>

              {showNewClassForm && (
                <div className="create-class-card">
                  <div className="form-header">
                    <h3>Créer une nouvelle classe/module</h3>
                    <button 
                      className="icon-button"
                      onClick={() => setShowNewClassForm(false)}
                    >
                      &times;
                    </button>
                  </div>
                  <div className="form-group">
                    <label>Nom de la classe/module</label>
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
                      placeholder="Décrivez la classe/module..."
                      rows="3"
                    />
                  </div>
                  <div className="form-actions">
                    <button 
                      className="secondary-button"
                      onClick={() => setShowNewClassForm(false)}
                    >
                      Annuler
                    </button>
                    <button 
                      className="primary-button" 
                      onClick={handleCreateClass}
                      disabled={!newClass.name.trim()}
                    >
                      <FiPlus /> Créer la classe
                    </button>
                  </div>
                </div>
              )}

              <div className="classes-grid">
                {classes.map(cls => (
                  <div key={cls.id} className="class-card">
                    <div className="class-header">
                      <div className="class-avatar">
                        <FiBook size={24} />
                      </div>
                      <div className="class-info">
                        <h3>{cls.name}</h3>
                        <p className="class-code">{cls.code}</p>
                        <p>{cls.description}</p>
                      </div>
                    </div>
                    <div className="class-stats">
                      <div className="stat">
                        <FiUsers />
                        <span>{cls.students} Étudiants</span>
                      </div>
                      <div className="stat">
                        <FiUsers />
                        <span>{cls.groups} Groupes</span>
                      </div>
                    </div>
                    <div className="class-actions">
                      <button 
                        className="secondary-button"
                        onClick={() => {
                          setActiveTab('students');
                          // Vous pourriez ajouter un filtre pour ne montrer que les étudiants de cette classe
                        }}
                      >
                        <FiUsers /> Étudiants
                      </button>
                      <button 
                        className="primary-button"
                        onClick={() => {
                          setActiveTab('groups');
                          // Vous pourriez ajouter un filtre pour ne montrer que les groupes de cette classe
                        }}
                      >
                        <FiUsers /> Groupes
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
                  <button 
                    className="primary-button"
                    onClick={() => setShowNewStudentForm(true)}
                  >
                    <FiUserPlus /> Ajouter un étudiant
                  </button>
                </div>
              </div>

              {showNewStudentForm && (
                <div className="create-student-card">
                  <div className="form-header">
                    <h3>Ajouter un nouvel étudiant</h3>
                    <button 
                      className="icon-button"
                      onClick={() => setShowNewStudentForm(false)}
                    >
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
                    <label>Classe/Module</label>
                    <select
                      value={newStudent.class}
                      onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
                    >
                      {classes.map(cls => (
                        <option key={cls.id} value={cls.name}>{cls.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-actions">
                    <button 
                      className="secondary-button"
                      onClick={() => setShowNewStudentForm(false)}
                    >
                      Annuler
                    </button>
                    <button 
                      className="primary-button" 
                      onClick={handleAddStudent}
                      disabled={!newStudent.name.trim() || !newStudent.email.trim()}
                    >
                      <FiUserPlus /> Ajouter
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
                            onChange={(e) => handleAddStudentToGroup(student.id, parseInt(e.target.value))}
                          >
                            <option value="Non assigné">Non assigné</option>
                            {groups.map(group => (
                              <option key={group.id} value={group.id}>{group.name}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <button className="icon-button">
                            <FiEdit2 />
                          </button>
                          <button className="icon-button">
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
                  <button className="primary-button" onClick={handleCreateGroup}>
                    <FiPlus /> Nouveau groupe
                  </button>
                </div>
              </div>

              <div className="groups-container">
                <div className="groups-list">
                  {filteredGroups.map(group => (
                    <div 
                      key={group.id} 
                      className={`group-card ${selectedGroup?.id === group.id ? 'selected' : ''}`}
                      onClick={() => setSelectedGroup(group)}
                    >
                      <div className="group-avatar" style={{ backgroundColor: group.avatarColor }}>
                        {group.name.charAt(0)}
                      </div>
                      <div className="group-info">
                        <h3>{group.name}</h3>
                        <p className="coordinator">Coordinateur: {group.coordinator || 'Non désigné'}</p>
                        <p className="last-activity">{group.lastActivity}</p>
                        <div className="progress-container">
                          <div className="progress-labels">
                            <span>Progression</span>
                            <span>{group.progress}%</span>
                          </div>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${group.progress}%` }}></div>
                          </div>
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
                        <button className="icon-button">
                          <FiEdit2 />
                        </button>
                        <button className="icon-button">
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>

                    <div className="detail-section">
                      <h4>Informations</h4>
                      <div className="info-grid">
                        <div className="info-item">
                          <span className="info-label">Coordinateur</span>
                          <span className="info-value">{selectedGroup.coordinator || 'Non désigné'}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Dernière activité</span>
                          <span className="info-value">{selectedGroup.lastActivity}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Progression</span>
                          <div className="progress-container">
                            <div className="progress-bar">
                              <div 
                                className="progress-fill" 
                                style={{ width: `${selectedGroup.progress}%` }}
                              ></div>
                            </div>
                            <span className="progress-value">{selectedGroup.progress}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="detail-section">
                      <div className="section-header">
                        <h4>Membres du groupe ({selectedGroup.members.length})</h4>
                        <button 
                          className="text-button"
                          onClick={() => {
                            setActiveTab('students');
                            // Vous pourriez ajouter un filtre pour ne montrer que les étudiants non assignés
                          }}
                        >
                          <FiUserPlus /> Ajouter un membre
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
                            onClick={() => toggleMilestoneCompletion(selectedGroup.id, milestone.name)}
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
                <button 
                  className="primary-button"
                  onClick={() => setShowNewTaskForm(true)}
                >
                  <FiPlus /> Nouvelle tâche
                </button>
              </div>

              {showNewTaskForm && (
                <div className="create-task-card">
                  <div className="form-header">
                    <h3>Créer une nouvelle tâche</h3>
                    <button 
                      className="icon-button"
                      onClick={() => setShowNewTaskForm(false)}
                    >
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
                      placeholder="Décrivez la tâche en détail..."
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
                    <label>Fichier joint (optionnel)</label>
                    <div className="file-upload">
                      <label className="upload-button">
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
                            className="icon-button small"
                            onClick={() => setNewTask({...newTask, file: null})}
                          >
                            &times;
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="form-actions">
                    <button 
                      className="secondary-button"
                      onClick={() => setShowNewTaskForm(false)}
                    >
                      Annuler
                    </button>
                    <button 
                      className="primary-button" 
                      onClick={handleCreateTask}
                      disabled={!newTask.title.trim() || !newTask.deadline}
                    >
                      <FiUpload /> Publier la tâche
                    </button>
                  </div>
                </div>
              )}

              <div className="tasks-list">
                <div className="filter-options">
                  <button className="filter-button active">Toutes</button>
                  <button className="filter-button">En cours</button>
                  <button className="filter-button">Soumises</button>
                  <button className="filter-button">Corrigées</button>
                </div>
                
                {filteredTasks.map(task => (
                  <div key={task.id} className="task-card">
                    <div className="task-header">
                      <div className="task-title">
                        <h3>{task.title}</h3>
                        <span className="group-badge">
                          {task.group === 'all' ? 'Tous groupes' : task.group}
                        </span>
                      </div>
                      <div className="task-meta">
                        <span className="deadline">
                          <FiCalendar /> {task.deadline}
                        </span>
                        <div className="task-actions">
                          <button className="icon-button">
                            <BsThreeDotsVertical />
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="task-description">{task.description}</p>
                    <div className="task-footer">
                      <div className="submission-info">
                        <div className="submission-progress">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${(task.submitted.length / groups.filter(g => task.group === 'all' || g.name === task.group).length) * 100}%` }}
                            ></div>
                          </div>
                          <span>
                            {task.submitted.length}/{task.group === 'all' ? groups.length : 1} soumissions
                          </span>
                        </div>
                      </div>
                      <div className="task-actions">
                        {task.submissions.length > 0 && (
                          <button 
                            className="secondary-button"
                            onClick={() => {
                              setSelectedTask(task);
                              setShowTaskCorrection(true);
                            }}
                          >
                            <FiCheckCircle /> Corriger
                          </button>
                        )}
                        <button 
                          className="primary-button"
                          onClick={() => {
                            setSelectedTask(task);
                            setSelectedGroup(null);
                          }}
                        >
                          <FiFileText /> Voir les travaux
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Task Correction Modal */}
              {showTaskCorrection && selectedTask && (
                <div className="modal-overlay">
                  <div className="correction-modal">
                    <div className="modal-header">
                      <h3>Correction: {selectedTask.title}</h3>
                      <button 
                        className="icon-button"
                        onClick={() => setShowTaskCorrection(false)}
                      >
                        &times;
                      </button>
                    </div>
                    
                    <div className="modal-body">
                      <div className="group-selector">
                        <label>Sélectionner un groupe:</label>
                        <select
                          value={selectedGroup?.id || ''}
                          onChange={(e) => {
                            const groupId = parseInt(e.target.value);
                            setSelectedGroup(groups.find(g => g.id === groupId));
                          }}
                        >
                          <option value="">Choisir un groupe</option>
                          {groups
                            .filter(group => selectedTask.group === 'all' || group.name === selectedTask.group)
                            .map(group => (
                              <option key={group.id} value={group.id}>{group.name}</option>
                            ))}
                        </select>
                      </div>
                      
                      {selectedGroup && (
                        <div className="correction-form">
                          <div className="submission-details">
                            <h4>Travail du {selectedGroup.name}</h4>
                            {selectedTask.submissions.find(s => s.groupId === selectedGroup.id) ? (
                              <div className="submission-info">
                                <p>
                                  <strong>Fichier:</strong> {
                                    selectedTask.submissions.find(s => s.groupId === selectedGroup.id).file
                                  }
                                </p>
                                <p>
                                  <strong>Soumis le:</strong> {
                                    selectedTask.submissions.find(s => s.groupId === selectedGroup.id).date
                                  }
                                </p>
                              </div>
                            ) : (
                              <p>Aucun travail soumis par ce groupe.</p>
                            )}
                          </div>
                          
                          <div className="form-group">
                            <label>Note</label>
                            <input
                              type="text"
                              value={grade || selectedTask.submissions.find(s => s.groupId === selectedGroup.id)?.grade || ''}
                              onChange={(e) => setGrade(e.target.value)}
                              placeholder="Ex: 15/20"
                            />
                          </div>
                          <div className="form-group">
                            <label>Feedback</label>
                            <textarea
                              value={feedback || selectedTask.submissions.find(s => s.groupId === selectedGroup.id)?.feedback || ''}
                              onChange={(e) => setFeedback(e.target.value)}
                              placeholder="Donnez votre feedback détaillé..."
                              rows="5"
                            />
                          </div>
                          <div className="form-actions">
                            <button 
                              className="secondary-button"
                              onClick={() => setShowTaskCorrection(false)}
                            >
                              Annuler
                            </button>
                            <button 
                              className="primary-button"
                              onClick={handleSubmitCorrection}
                              disabled={!feedback.trim()}
                            >
                              Enregistrer la correction
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && (
            <div className="progress-tab">
              <div className="section-header">
                <h2>Progression des groupes</h2>
                <div className="filter-options">
                  <button className="filter-button active">Tous</button>
                  <button className="filter-button">En retard</button>
                  <button className="filter-button">À jour</button>
                </div>
              </div>
              
              <div className="progress-grid">
                {groups.map(group => (
                  <div key={group.id} className="progress-card">
                    <div className="progress-header">
                      <div className="group-avatar" style={{ backgroundColor: group.avatarColor }}>
                        {group.name.charAt(0)}
                      </div>
                      <div className="group-info">
                        <h3>{group.name}</h3>
                        <p className="coordinator">Coordinateur: {group.coordinator}</p>
                        <p className="last-activity">{group.lastActivity}</p>
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
                    
                    <div className="progress-steps">
                      {group.milestones.map((milestone, index) => (
                        <div 
                          key={index} 
                          className={`step ${milestone.completed ? 'completed' : ''}`}
                          onClick={() => toggleMilestoneCompletion(group.id, milestone.name)}
                        >
                          <div className="step-icon">
                            {milestone.completed ? <BsCheckCircleFill /> : index + 1}
                          </div>
                          <div className="step-info">
                            <span>{milestone.name}</span>
                            {milestone.date && (
                              <small>{milestone.date}</small>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="progress-actions">
                      <button 
                        className="secondary-button"
                        onClick={() => {
                          setSelectedGroup(group);
                          setActiveTab('groups');
                        }}
                      >
                        <FiUsers /> Voir le groupe
                      </button>
                      <button 
                        className="primary-button"
                        onClick={() => {
                          setSelectedGroup(group);
                          setActiveTab('tasks');
                        }}
                      >
                        <FiFileText /> Travaux
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
                <button 
                  className="primary-button"
                  onClick={() => setShowNewAnnouncementForm(true)}
                >
                  <FiPlus /> Nouvelle annonce
                </button>
              </div>

              {showNewAnnouncementForm && (
                <div className="create-announcement-card">
                  <div className="form-header">
                    <h3>Créer une nouvelle annonce</h3>
                    <button 
                      className="icon-button"
                      onClick={() => setShowNewAnnouncementForm(false)}
                    >
                      &times;
                    </button>
                  </div>
                  <div className="form-group">
                    <textarea
                      value={newAnnouncement}
                      onChange={(e) => setNewAnnouncement(e.target.value)}
                      placeholder="Écrivez votre annonce ici..."
                      rows="4"
                    />
                  </div>
                  <div className="form-actions">
                    <button 
                      className="secondary-button"
                      onClick={() => setShowNewAnnouncementForm(false)}
                    >
                      Annuler
                    </button>
                    <button 
                      className="primary-button"
                      onClick={handlePublishAnnouncement}
                      disabled={!newAnnouncement.trim()}
                    >
                      <FiSend /> Publier
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
                        <div className="important-badge">Important</div>
                      )}
                    </div>
                    <div className="announcement-content">
                      <p>{announcement.content}</p>
                    </div>
                    <div className="announcement-actions">
                      <button className="text-button">
                        <FiMessageSquare /> Commenter
                      </button>
                      <button className="text-button">
                        <FiSend /> Partager
                      </button>
                    </div>
                  </div>
                ))}
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
                      className="primary-button small"
                      onClick={() => {
                        setSelectedMessage(null);
                        setSelectedGroup(null);
                      }}
                    >
                      <FiPlus /> Nouveau
                    </button>
                  </div>
                  
                  <div className="conversation-filters">
                    <button className="filter-button active">Tous</button>
                    <button className="filter-button">Publics</button>
                    <button className="filter-button">Privés</button>
                  </div>
                  
                  <div className="conversations">
                    {messages.map(msg => (
                      <div 
                        key={msg.id} 
                        className={`conversation-card ${selectedMessage?.id === msg.id ? 'active' : ''}`}
                        onClick={() => setSelectedMessage(msg)}
                      >
                        {!msg.read && msg.isPrivate && <div className="unread-badge"></div>}
                        <div className="avatar" style={{ backgroundColor: msg.isPrivate ? '#7F5AF0' : '#2CB67D' }}>
                          {msg.isPrivate ? msg.sender?.charAt(0) : 'A'}
                        </div>
                        <div className="conversation-info">
                          <div className="conversation-header">
                            <span className="name">
                              {msg.isPrivate ? msg.sender : 'Annonce publique'}
                            </span>
                            <span className="time">
                              {msg.date.split(' ')[1]} {/* Afficher seulement l'heure */}
                            </span>
                          </div>
                          <p className="last-message">
                            {msg.content.length > 50 ? `${msg.content.substring(0, 50)}...` : msg.content}
                          </p>
                          {msg.isPrivate && <span className="private-badge">Privé</span>}
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
                          <div 
                            className="avatar" 
                            style={{ backgroundColor: selectedMessage.isPrivate ? '#7F5AF0' : '#2CB67D' }}
                          >
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
                          <button className="icon-button">
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
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          rows="3"
                        />
                        <div className="reply-actions">
                          <button className="icon-button">
                            <FiPaperclip />
                          </button>
                          <div className="reply-options">
                            <button 
                              className="primary-button small"
                              onClick={handleSendMessage}
                              disabled={!newMessage.trim()}
                            >
                              <FiSend /> Envoyer
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="new-message-view">
                      <div className="empty-state">
                        <FiMessageSquare size={48} className="icon" />
                        <h3>Nouvelle conversation</h3>
                        
                        <div className="recipient-selector">
                          <label>Envoyer à:</label>
                          <select
                            value={selectedGroup?.id || ''}
                            onChange={(e) => {
                              const groupId = parseInt(e.target.value);
                              setSelectedGroup(groups.find(g => g.id === groupId));
                            }}
                          >
                            <option value="">Choisir un groupe (message privé)</option>
                            {groups.map(group => (
                              <option key={group.id} value={group.id}>{group.name}</option>
                            ))}
                            <option value="all">Tous les groupes (message public)</option>
                          </select>
                        </div>
                        
                        <div className="message-composer">
                          <textarea
                            placeholder="Écrivez votre message ici..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            rows="6"
                          />
                          <div className="composer-actions">
                            <button className="icon-button">
                              <FiPaperclip />
                            </button>
                            <button 
                              className="primary-button"
                              onClick={handleSendMessage}
                              disabled={!newMessage.trim()}
                            >
                              <FiSend /> Envoyer le message
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="documents-tab">
              <div className="section-header">
                <h2>Documents partagés</h2>
                <div className="actions">
                  <label className="upload-button">
                    <FiUpload /> Téléverser un document
                    <input 
                      type="file" 
                      onChange={handleUploadDocument}
                      hidden
                    />
                  </label>
                </div>
              </div>
              
              <div className="documents-list">
                <div className="documents-filter">
                  <button className="filter-button active">Tous</button>
                  <button className="filter-button">Pour tous</button>
                  <button className="filter-button">Par groupe</button>
                </div>
                
                <table className="documents-table">
                  <thead>
                    <tr>
                      <th>Nom</th>
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
                        <td>{doc.size}</td>
                        <td>{doc.date}</td>
                        <td>{doc.group === 'all' ? 'Tous' : doc.group}</td>
                        <td>
                          <div className="document-actions">
                            <button className="icon-button">
                              <FiDownload />
                            </button>
                            <button className="icon-button">
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
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;