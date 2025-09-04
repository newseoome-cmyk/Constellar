import React, { useState, useEffect } from 'react';
import { Star, Trophy, Zap, Target, Calendar, Gift, Users, Settings, X, Play, Heart, Dumbbell, BookOpen, Palette, Briefcase, CheckCircle, Lock, Flame, Coins, Plus, MessageCircle, Coffee, Moon, Sun, ArrowRight, Sparkles, Smile, Send } from 'lucide-react';

const ConstellationToDoApp = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showMascot, setShowMascot] = useState(true);
  const [mascotMessage, setMascotMessage] = useState("Ready to explore the stars together? ✨");
  const [username, setUsername] = useState('');
  const [showGuide, setShowGuide] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationQuest, setCelebrationQuest] = useState(null);
  const [player, setPlayer] = useState({
    name: 'Explorer',
    level: 4,
    totalExp: 1850,
    coins: 280,
    completedQuests: ['morning_coffee', 'daily_reading', 'workout_basic'],
    comments: {
      'morning_coffee': 'Such a peaceful way to start the day! Really helps me focus.',
      'daily_reading': 'Finished an amazing chapter about productivity. Feeling inspired!',
      'workout_basic': 'Felt great after 30 minutes of cardio. Energy boost for the whole day!'
    },
    streaks: { morning_coffee: 15, daily_reading: 8, workout_basic: 5 },
    inventory: ['basic_theme'],
    equippedTheme: 'basic_theme',
    customQuests: {},
    activeBoosts: {},
    lastCompletionDates: {}
  });

  const [activeConstellation, setActiveConstellation] = useState('wellness');
  const [activeTab, setActiveTab] = useState('quests');
  const [selectedShopCategory, setSelectedShopCategory] = useState('theme');
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuestText, setNewQuestText] = useState('');
  const [notification, setNotification] = useState(null);

  // Shop items
  const shopItems = [
    {
      id: 'golden_theme',
      name: 'Golden Nebula Theme',
      description: 'Transform your interface with shimmering gold accents and cosmic sparkles',
      price: 500,
      icon: Star,
      category: 'theme',
      preview: 'linear-gradient(to-br, #fbbf24, #f59e0b, #d97706)'
    },
    {
      id: 'emerald_theme',
      name: 'Emerald Galaxy Theme',
      description: 'Soothing green cosmic colors that promote focus and tranquility',
      price: 400,
      icon: Heart,
      category: 'theme',
      preview: 'linear-gradient(to-br, #10b981, #059669, #047857)'
    },
    {
      id: 'ruby_theme',
      name: 'Ruby Stardust Theme',
      description: 'Passionate red and pink hues that energize your quest journey',
      price: 450,
      icon: Flame,
      category: 'theme',
      preview: 'linear-gradient(to-br, #ef4444, #dc2626, #b91c1c)'
    },
    {
      id: 'double_xp',
      name: 'Double XP Booster',
      description: 'Doubles XP gain for the next 5 completed quests',
      price: 200,
      icon: Zap,
      category: 'booster',
      uses: 5
    },
    {
      id: 'coin_multiplier',
      name: 'Coin Multiplier',
      description: 'Increases coin rewards by 50% for the next 10 quests',
      price: 150,
      icon: Coins,
      category: 'booster',
      uses: 10
    },
    {
      id: 'streak_shield',
      name: 'Streak Shield',
      description: 'Protects one streak from breaking if you miss a day',
      price: 300,
      icon: Target,
      category: 'power',
      uses: 1
    },
    {
      id: 'mascot_hat',
      name: 'Cosmic Mascot Hat',
      description: 'Give your mascot a stylish space explorer hat',
      price: 250,
      icon: Smile,
      category: 'cosmetic'
    },
    {
      id: 'quest_refresher',
      name: 'Quest Refresher',
      description: 'Instantly refresh all quests to uncompleted state',
      price: 100,
      icon: Plus,
      category: 'utility',
      uses: 1
    }
  ];

  // Mascot messages
  const mascotMessages = [
    "You're doing amazing! Keep up the great work! 🌟",
    "Every quest completed brings you closer to your goals! 🚀",
    "I believe in you! Let's conquer today together! 💪",
    "Your dedication is inspiring! ✨",
    "Ready for another adventure? 🌙",
    "You're building incredible habits! 🏆"
  ];

  // Enhanced constellation quest data with categorization
  const constellations = {
    wellness: {
      name: 'Wellness',
      icon: Heart,
      color: '#ec4899',
      description: 'Nurture your mind and body',
      position: { x: 50, y: 20 },
      category: 'Personal Growth',
      quests: [
        { 
          id: 'morning_coffee', 
          name: 'Morning Coffee Ritual', 
          exp: 20, 
          icon: Coffee, 
          position: { x: 25, y: 35 },
          category: 'Mindfulness',
          difficulty: 'Easy',
          timeEstimate: '10 min',
          tags: ['daily', 'routine', 'mindful']
        },
        { 
          id: 'daily_reading', 
          name: 'Read for 30 minutes', 
          exp: 40, 
          icon: BookOpen, 
          position: { x: 75, y: 35 },
          category: 'Learning',
          difficulty: 'Medium',
          timeEstimate: '30 min',
          tags: ['education', 'growth', 'focus']
        },
        { 
          id: 'meditation', 
          name: 'Meditate 10 minutes', 
          exp: 35, 
          icon: Star, 
          position: { x: 15, y: 50 },
          category: 'Mindfulness',
          difficulty: 'Medium',
          timeEstimate: '10 min',
          tags: ['stress-relief', 'mindful', 'calm']
        },
        { 
          id: 'gratitude_journal', 
          name: 'Write 3 things I\'m grateful for', 
          exp: 30, 
          icon: Heart, 
          position: { x: 85, y: 50 },
          category: 'Mental Health',
          difficulty: 'Easy',
          timeEstimate: '5 min',
          tags: ['gratitude', 'writing', 'positive']
        },
        { 
          id: 'nature_walk', 
          name: 'Take a walk in nature', 
          exp: 45, 
          icon: Sun, 
          position: { x: 50, y: 65 },
          category: 'Physical Activity',
          difficulty: 'Easy',
          timeEstimate: '20 min',
          tags: ['outdoor', 'exercise', 'fresh-air']
        }
      ]
    },
    fitness: {
      name: 'Fitness',
      icon: Dumbbell,
      color: '#f97316',
      description: 'Build strength and vitality',
      position: { x: 85, y: 35 },
      category: 'Physical Health',
      quests: [
        { 
          id: 'workout_basic', 
          name: 'Basic workout routine', 
          exp: 50, 
          icon: Dumbbell, 
          position: { x: 70, y: 20 },
          category: 'Strength Training',
          difficulty: 'Medium',
          timeEstimate: '30 min',
          tags: ['strength', 'cardio', 'routine']
        },
        { 
          id: 'water_intake', 
          name: 'Drink 8 glasses of water', 
          exp: 25, 
          icon: Target, 
          position: { x: 90, y: 25 },
          category: 'Nutrition',
          difficulty: 'Easy',
          timeEstimate: 'All day',
          tags: ['hydration', 'health', 'daily']
        },
        { 
          id: 'steps_goal', 
          name: 'Walk 10,000 steps', 
          exp: 40, 
          icon: Target, 
          position: { x: 95, y: 45 },
          category: 'Cardio',
          difficulty: 'Medium',
          timeEstimate: '60 min',
          tags: ['walking', 'cardio', 'endurance']
        },
        { 
          id: 'stretching', 
          name: 'Stretch for 15 minutes', 
          exp: 30, 
          icon: Dumbbell, 
          position: { x: 80, y: 55 },
          category: 'Flexibility',
          difficulty: 'Easy',
          timeEstimate: '15 min',
          tags: ['flexibility', 'recovery', 'mobility']
        },
        { 
          id: 'healthy_meal', 
          name: 'Cook a healthy meal', 
          exp: 45, 
          icon: Heart, 
          position: { x: 75, y: 45 },
          category: 'Nutrition',
          difficulty: 'Medium',
          timeEstimate: '45 min',
          tags: ['cooking', 'nutrition', 'health']
        }
      ]
    },
    learning: {
      name: 'Learning',
      icon: BookOpen,
      color: '#3b82f6',
      description: 'Expand your knowledge',
      position: { x: 85, y: 65 },
      category: 'Education',
      quests: [
        { 
          id: 'skill_practice', 
          name: 'Practice new skill', 
          exp: 60, 
          icon: Target, 
          position: { x: 75, y: 75 },
          category: 'Skill Development',
          difficulty: 'Hard',
          timeEstimate: '45 min',
          tags: ['skill', 'practice', 'growth']
        },
        { 
          id: 'online_course', 
          name: 'Complete course module', 
          exp: 80, 
          icon: BookOpen, 
          position: { x: 90, y: 70 },
          category: 'Formal Learning',
          difficulty: 'Hard',
          timeEstimate: '60 min',
          tags: ['course', 'education', 'knowledge']
        },
        { 
          id: 'podcast_listen', 
          name: 'Listen to educational podcast', 
          exp: 35, 
          icon: Play, 
          position: { x: 95, y: 55 },
          category: 'Passive Learning',
          difficulty: 'Easy',
          timeEstimate: '30 min',
          tags: ['podcast', 'audio', 'learning']
        },
        { 
          id: 'article_read', 
          name: 'Read industry article', 
          exp: 40, 
          icon: BookOpen, 
          position: { x: 70, y: 55 },
          category: 'Knowledge',
          difficulty: 'Medium',
          timeEstimate: '20 min',
          tags: ['reading', 'industry', 'current']
        },
        { 
          id: 'notes_review', 
          name: 'Review and organize notes', 
          exp: 25, 
          icon: Star, 
          position: { x: 80, y: 80 },
          category: 'Organization',
          difficulty: 'Easy',
          timeEstimate: '15 min',
          tags: ['organization', 'review', 'notes']
        }
      ]
    },
    creativity: {
      name: 'Creativity',
      icon: Palette,
      color: '#8b5cf6',
      description: 'Express your artistic side',
      position: { x: 15, y: 65 },
      category: 'Creative Expression',
      quests: [
        { 
          id: 'creative_write', 
          name: 'Write creatively for 30 min', 
          exp: 55, 
          icon: Palette, 
          position: { x: 25, y: 75 },
          category: 'Writing',
          difficulty: 'Medium',
          timeEstimate: '30 min',
          tags: ['writing', 'creative', 'expression']
        },
        { 
          id: 'photo_project', 
          name: 'Take artistic photos', 
          exp: 40, 
          icon: Target, 
          position: { x: 10, y: 70 },
          category: 'Photography',
          difficulty: 'Medium',
          timeEstimate: '20 min',
          tags: ['photography', 'art', 'visual']
        },
        { 
          id: 'draw_sketch', 
          name: 'Draw or sketch something', 
          exp: 45, 
          icon: Palette, 
          position: { x: 5, y: 55 },
          category: 'Visual Art',
          difficulty: 'Medium',
          timeEstimate: '25 min',
          tags: ['drawing', 'sketch', 'art']
        },
        { 
          id: 'music_practice', 
          name: 'Practice musical instrument', 
          exp: 50, 
          icon: Star, 
          position: { x: 30, y: 55 },
          category: 'Music',
          difficulty: 'Medium',
          timeEstimate: '30 min',
          tags: ['music', 'instrument', 'practice']
        },
        { 
          id: 'craft_project', 
          name: 'Work on craft project', 
          exp: 60, 
          icon: Gift, 
          position: { x: 20, y: 80 },
          category: 'Crafting',
          difficulty: 'Hard',
          timeEstimate: '60 min',
          tags: ['crafting', 'hands-on', 'creative']
        }
      ]
    },
    social: {
      name: 'Social',
      icon: Users,
      color: '#10b981',
      description: 'Connect and contribute',
      position: { x: 15, y: 35 },
      category: 'Relationships',
      quests: [
        { 
          id: 'friend_call', 
          name: 'Call a friend or family', 
          exp: 40, 
          icon: Users, 
          position: { x: 25, y: 20 },
          category: 'Communication',
          difficulty: 'Easy',
          timeEstimate: '15 min',
          tags: ['communication', 'relationships', 'social']
        },
        { 
          id: 'help_someone', 
          name: 'Help someone today', 
          exp: 50, 
          icon: Heart, 
          position: { x: 10, y: 25 },
          category: 'Service',
          difficulty: 'Medium',
          timeEstimate: '30 min',
          tags: ['helping', 'kindness', 'service']
        },
        { 
          id: 'compliment_give', 
          name: 'Give genuine compliment', 
          exp: 25, 
          icon: Star, 
          position: { x: 5, y: 45 },
          category: 'Kindness',
          difficulty: 'Easy',
          timeEstimate: '2 min',
          tags: ['kindness', 'positivity', 'social']
        },
        { 
          id: 'community_engage', 
          name: 'Engage in community activity', 
          exp: 60, 
          icon: Users, 
          position: { x: 30, y: 45 },
          category: 'Community',
          difficulty: 'Medium',
          timeEstimate: '60 min',
          tags: ['community', 'engagement', 'social']
        },
        { 
          id: 'team_collaborate', 
          name: 'Collaborate on team project', 
          exp: 55, 
          icon: Target, 
          position: { x: 20, y: 25 },
          category: 'Teamwork',
          difficulty: 'Medium',
          timeEstimate: '45 min',
          tags: ['teamwork', 'collaboration', 'work']
        }
      ]
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const startGame = () => {
    const finalUsername = username.trim() || 'Explorer';
    setPlayer(prev => ({ ...prev, name: finalUsername }));
    setGameStarted(true);
    setMascotMessage(`Welcome ${finalUsername}! Let's start this amazing journey! 🚀`);
    setShowMascot(true);
    setTimeout(() => setShowMascot(false), 4000);
  };

  const purchaseItem = (item) => {
    if (player.coins >= item.price && !player.inventory.includes(item.id)) {
      setPlayer({
        ...player,
        coins: player.coins - item.price,
        inventory: [...player.inventory, item.id]
      });
      
      // Apply item effects
      if (item.category === 'theme') {
        setPlayer(prev => ({ ...prev, equippedTheme: item.id }));
      } else if (item.category === 'booster' || item.category === 'power') {
        setPlayer(prev => ({
          ...prev,
          activeBoosts: {
            ...prev.activeBoosts,
            [item.id]: item.uses || 1
          }
        }));
      }
      
      showNotification(`${item.name} purchased and activated!`);
      setMascotMessage(`You got ${item.name}! Time to use it wisely!`);
      setShowMascot(true);
      setTimeout(() => setShowMascot(false), 3000);
    }
  };

  const toggleQuest = (questId) => {
    const isCompleted = player.completedQuests.includes(questId);
    
    // Find quest in constellations or custom quests
    let quest = null;
    for (const constKey of Object.keys(constellations)) {
      quest = constellations[constKey].quests.find(q => q.id === questId);
      if (quest) break;
    }
    
    if (!quest) {
      for (const constKey of Object.keys(player.customQuests)) {
        quest = (player.customQuests[constKey] || []).find(q => q.id === questId);
        if (quest) break;
      }
    }
    
    if (!quest) return;
    
    if (!isCompleted) {
      // Calculate boosted rewards
      let expGain = quest.exp;
      let coinGain = Math.floor(quest.exp / 2);
      
      // Apply Double XP boost
      if (player.activeBoosts.double_xp > 0) {
        expGain *= 2;
        setPlayer(prev => ({
          ...prev,
          activeBoosts: {
            ...prev.activeBoosts,
            double_xp: prev.activeBoosts.double_xp - 1
          }
        }));
      }
      
      // Apply Coin Multiplier boost
      if (player.activeBoosts.coin_multiplier > 0) {
        coinGain = Math.floor(coinGain * 1.5);
        setPlayer(prev => ({
          ...prev,
          activeBoosts: {
            ...prev.activeBoosts,
            coin_multiplier: prev.activeBoosts.coin_multiplier - 1
          }
        }));
      }
      
      // Update completion date for streak tracking
      const today = new Date().toDateString();
      
      // Update player state
      setPlayer(prevPlayer => ({
        ...prevPlayer,
        completedQuests: [...prevPlayer.completedQuests, questId],
        totalExp: prevPlayer.totalExp + expGain,
        coins: prevPlayer.coins + coinGain,
        level: Math.floor((prevPlayer.totalExp + expGain) / 500) + 1,
        lastCompletionDates: {
          ...prevPlayer.lastCompletionDates,
          [questId]: today
        },
        streaks: {
          ...prevPlayer.streaks,
          [questId]: calculateNewStreak(questId, today)
        }
      }));
      
      // Show reflection modal
      setSelectedQuest({ ...quest, expGain, coinGain });
      setShowCommentModal(true);
      
      // Update mascot message
      const randomMessage = mascotMessages[Math.floor(Math.random() * mascotMessages.length)];
      setMascotMessage(randomMessage);
      
    } else {
      // Uncomplete quest
      setPlayer({
        ...player,
        completedQuests: player.completedQuests.filter(id => id !== questId),
        totalExp: Math.max(0, player.totalExp - quest.exp),
        coins: Math.max(0, player.coins - Math.floor(quest.exp / 2))
      });
      
      const newComments = { ...player.comments };
      delete newComments[questId];
      setPlayer(prev => ({ ...prev, comments: newComments }));
      
      showNotification('Quest unmarked');
    }
  };

  const calculateNewStreak = (questId, completionDate) => {
    const lastDate = player.lastCompletionDates[questId];
    const currentStreak = player.streaks[questId] || 0;
    
    if (!lastDate) return 1; // First completion
    
    const last = new Date(lastDate);
    const current = new Date(completionDate);
    const diffDays = Math.floor((current - last) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return currentStreak + 1; // Consecutive day
    } else if (diffDays === 0) {
      return currentStreak; // Same day
    } else {
      return 1; // Streak broken, start new
    }
  };

  const saveComment = () => {
    if (commentText.trim() && selectedQuest) {
      setPlayer({
        ...player,
        comments: {
          ...player.comments,
          [selectedQuest.id]: commentText.trim()
        }
      });
      
      setCommentText('');
      setShowCommentModal(false);
      
      // Show celebration animation after saving reflection
      setCelebrationQuest(selectedQuest);
      setShowCelebration(true);
      
      // Hide celebration after 3 seconds
      setTimeout(() => {
        setShowCelebration(false);
        setCelebrationQuest(null);
      }, 3000);
      
      setSelectedQuest(null);
      showNotification(`Quest completed! +${selectedQuest.expGain || selectedQuest.exp} XP`);
    }
  };

  const skipReflection = () => {
    if (selectedQuest) {
      setCommentText('');
      setShowCommentModal(false);
      
      // Show celebration animation after skipping
      setCelebrationQuest(selectedQuest);
      setShowCelebration(true);
      
      // Hide celebration after 3 seconds
      setTimeout(() => {
        setShowCelebration(false);
        setCelebrationQuest(null);
      }, 3000);
      
      setSelectedQuest(null);
      showNotification(`Quest completed! +${selectedQuest.expGain || selectedQuest.exp} XP`);
    }
  };

  const addCustomQuest = () => {
    if (newQuestText.trim()) {
      const questId = `custom_${Date.now()}`;
      const newQuest = {
        id: questId,
        name: newQuestText.trim(),
        exp: 40,
        icon: Star,
        isCustom: true,
        category: 'Custom',
        difficulty: 'Medium',
        timeEstimate: '30 min',
        tags: ['custom', 'personal'],
        position: { x: 50 + (Math.random() - 0.5) * 20, y: 50 + (Math.random() - 0.5) * 20 }
      };
      
      setPlayer({
        ...player,
        customQuests: {
          ...player.customQuests,
          [activeConstellation]: [
            ...(player.customQuests[activeConstellation] || []),
            newQuest
          ]
        }
      });
      
      showNotification('Custom quest added successfully!');
      setNewQuestText('');
      setShowAddModal(false);
    }
  };

  const getConstellationProgress = (constKey) => {
    const quests = constellations[constKey].quests;
    const completed = quests.filter(q => player.completedQuests.includes(q.id)).length;
    return { completed, total: quests.length, percentage: (completed / quests.length) * 100 };
  };

  // Get difficulty badge color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // Animated Mascot Component
  const AnimatedMascot = ({ size = 'large' }) => {
    const [bounce, setBounce] = useState(false);
    
    useEffect(() => {
      const interval = setInterval(() => {
        setBounce(true);
        setTimeout(() => setBounce(false), 600);
      }, 3000);
      return () => clearInterval(interval);
    }, []);

    const sizeClasses = size === 'large' ? 'w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24' : 'w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16';
    
    return (
      <div className={`${sizeClasses} relative ${bounce ? 'animate-bounce' : ''} transition-all duration-300`}>
        {/* Mascot Body */}
        <div className="w-full h-full bg-gradient-to-br from-cyan-300 via-blue-400 to-purple-500 rounded-full border-2 sm:border-4 border-white/30 shadow-2xl relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute inset-1 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
          
          {/* Eyes */}
          <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
          
          {/* Smile */}
          <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2">
            <div className="w-3 h-1.5 sm:w-4 sm:h-2 border-b-2 border-white rounded-full" />
          </div>
          
          {/* Sparkles around mascot */}
          <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-2 h-2 sm:w-3 sm:h-3">
            <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-300 animate-pulse" />
          </div>
          <div className="absolute -top-0.5 -right-2 sm:-top-1 sm:-right-3 w-1.5 h-1.5 sm:w-2 sm:h-2">
            <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-pink-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <div className="absolute -bottom-1 -right-0.5 sm:-bottom-2 sm:-right-1 w-1.5 h-1.5 sm:w-2 sm:h-2">
            <Target className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-cyan-300 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    );
  };

  // Celebration Animation Component
  const CelebrationAnimation = ({ quest }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        {/* Confetti particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={`confetti-${i}`}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <div 
                className="w-2 h-2 sm:w-3 sm:h-3 rotate-45"
                style={{
                  backgroundColor: ['#fbbf24', '#10b981', '#8b5cf6', '#ef4444', '#06b6d4'][Math.floor(Math.random() * 5)]
                }}
              />
            </div>
          ))}
        </div>

        {/* Main celebration card */}
        <div className="bg-gradient-to-br from-yellow-400/90 to-orange-500/90 p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-yellow-300 shadow-2xl animate-celebration-bounce max-w-xs sm:max-w-sm mx-4 text-center">
          <div className="animate-celebration-pulse">
            <Trophy className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-white mx-auto mb-2 sm:mb-4 drop-shadow-lg animate-spin-slow" />
          </div>
          
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 animate-text-glow">
            QUEST COMPLETE!
          </h2>
          
          <p className="text-sm sm:text-lg lg:text-xl text-yellow-100 mb-3 sm:mb-4 font-medium break-words">
            {quest?.name}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-3 sm:mb-4">
            <div className="flex items-center gap-2 bg-white/20 px-3 sm:px-4 py-2 rounded-full">
              <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-200" />
              <span className="text-base sm:text-xl font-bold text-white">+{quest?.expGain || quest?.exp}</span>
              {quest?.expGain && quest?.expGain > quest?.exp && (
                <span className="text-xs sm:text-sm text-cyan-200">(Boosted!)</span>
              )}
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 sm:px-4 py-2 rounded-full">
              <Coins className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-200" />
              <span className="text-base sm:text-xl font-bold text-white">+{quest?.coinGain || Math.floor(quest?.exp / 2)}</span>
              {quest?.coinGain && quest?.coinGain > Math.floor(quest?.exp / 2) && (
                <span className="text-xs sm:text-sm text-yellow-200">(Boosted!)</span>
              )}
            </div>
          </div>
          
          <div className="text-sm sm:text-lg text-yellow-100 font-medium animate-pulse">
            Amazing work, {player.name}! ⭐
          </div>
        </div>
      </div>
    );
  };

  // Shop Component
  const ShopPage = () => {
    const categories = ['theme', 'booster', 'power', 'cosmetic', 'utility'];
    const [selectedCategory, setSelectedCategory] = useState('theme');

    const filteredItems = shopItems.filter(item => item.category === selectedCategory);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col">
        {/* Shop Header */}
        <div className="bg-black/30 backdrop-blur-md border-b border-white/20 p-3 sm:p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full flex items-center justify-center">
              <Gift className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">Cosmic Shop</h1>
              <p className="text-xs sm:text-sm text-gray-300 hidden sm:block">Spend your hard-earned coins</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-2 bg-yellow-500/20 px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl border border-yellow-400/30">
              <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
              <span className="font-bold text-yellow-400 text-sm sm:text-base">{player.coins}</span>
            </div>
            <button
              onClick={() => setShowShop(false)}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 hover:bg-gray-600 rounded-lg sm:rounded-xl flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="bg-black/20 border-b border-white/10 p-2 sm:p-3">
          <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl transition-all duration-300 capitalize text-sm sm:text-base ${
                  selectedCategory === category 
                    ? 'bg-purple-600 text-white shadow-lg' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {category}s
              </button>
            ))}
          </div>
        </div>

        {/* Shop Items */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
          {filteredItems.map((item) => {
            const isOwned = player.inventory.includes(item.id);
            const canAfford = player.coins >= item.price;
            
            return (
              <div 
                key={item.id}
                className={`p-3 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 ${
                  isOwned 
                    ? 'bg-green-500/20 border-green-500/50' 
                    : 'bg-white/5 border-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    item.category === 'theme' ? 'bg-gradient-to-br' : 'bg-purple-600/30'
                  }`}
                  style={item.category === 'theme' ? { background: item.preview } : {}}>
                    <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base sm:text-lg font-bold text-white truncate pr-2">{item.name}</h3>
                      {isOwned && <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs flex-shrink-0">Owned</div>}
                    </div>
                    
                    <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                        <span className="text-yellow-400 font-bold text-sm sm:text-base">{item.price}</span>
                        {item.uses && (
                          <span className="text-gray-400 text-xs sm:text-sm">• {item.uses} uses</span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => purchaseItem(item)}
                        disabled={isOwned || !canAfford}
                        className={`px-4 sm:px-6 py-2 rounded-lg sm:rounded-xl font-medium transition-all text-sm sm:text-base ${
                          isOwned 
                            ? 'bg-green-600 text-white cursor-default' 
                            : canAfford 
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white hover:scale-105' 
                              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {isOwned ? 'Owned' : canAfford ? 'Purchase' : 'Need more coins'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Guide Page Component
  const GuidePage = () => {
    const guideSteps = [
      {
        title: "Welcome to Constellation Quest!",
        icon: Star,
        color: "#06b6d4",
        content: "Transform your daily habits into an epic space adventure! Complete quests, earn XP, and level up while building amazing habits."
      },
      {
        title: "Navigate the Cosmos",
        icon: Target,
        color: "#8b5cf6",
        content: "Explore the beautiful constellation map! Each star represents a quest, and the larger nodes are constellation centers. Click any quest to complete it."
      },
      {
        title: "Complete Quests",
        icon: CheckCircle,
        color: "#10b981",
        content: "Click any quest node to mark it complete. You'll earn XP and coins, plus unlock the reflection modal to share your experience!"
      },
      {
        title: "Build Streaks",
        icon: Flame,
        color: "#f97316",
        content: "Complete the same quest multiple days in a row to build streaks! Streaks are shown with fire badges and help maintain consistency."
      },
      {
        title: "Share Reflections",
        icon: MessageCircle,
        color: "#ec4899",
        content: "After completing a quest, add a personal reflection about your experience. This helps you track progress and stay motivated!"
      },
      {
        title: "Level Up & Earn Rewards",
        icon: Trophy,
        color: "#eab308",
        content: "Earn XP and coins for each completed quest. Level up every 500 XP! Your progress is shown in the header with a beautiful progress bar."
      }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col">
        <div className="bg-black/30 backdrop-blur-md border-b border-white/20 p-3 sm:p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center">
              <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">Quest Guide</h1>
              <p className="text-xs sm:text-sm text-gray-300 hidden sm:block">Learn how to master your journey</p>
            </div>
          </div>
          <button
            onClick={() => setShowGuide(false)}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 hover:bg-gray-600 rounded-lg sm:rounded-xl flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
          {guideSteps.map((step, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-md p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <div 
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center border-2 shadow-lg relative overflow-hidden"
                    style={{ 
                      backgroundColor: `${step.color}20`, 
                      borderColor: step.color,
                      boxShadow: `0 0 20px ${step.color}30`
                    }}
                  >
                    <step.icon className="w-6 h-6 sm:w-8 sm:h-8 relative z-10" style={{ color: step.color }} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-white">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{step.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Constellation Map Component
  const ConstellationMap = () => {
    const allQuests = [];
    
    // Collect all quests from all constellations with their positions
    Object.entries(constellations).forEach(([constKey, constellation]) => {
      // Add constellation center
      allQuests.push({
        id: `constellation_${constKey}`,
        name: constellation.name,
        isConstellation: true,
        constellation: constKey,
        position: constellation.position,
        icon: constellation.icon,
        color: constellation.color,
        category: constellation.category
      });
      
      // Add constellation quests
      constellation.quests.forEach(quest => {
        allQuests.push({
          ...quest,
          constellation: constKey,
          isConstellation: false
        });
      });
    });

    // Add custom quests
    Object.entries(player.customQuests).forEach(([constKey, quests]) => {
      quests.forEach(quest => {
        allQuests.push({
          ...quest,
          constellation: constKey,
          isConstellation: false
        });
      });
    });

    return (
      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] bg-gradient-to-br from-slate-900/50 to-purple-900/50 rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden">
        {/* Background stars */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`bg-star-${i}`}
            className="absolute bg-white rounded-full animate-pulse opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`
            }}
          />
        ))}

        {/* Constellation connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          <defs>
            {/* Simple gradients for each constellation */}
            {Object.entries(constellations).map(([constKey, constellation]) => (
              <linearGradient key={`gradient-${constKey}`} id={`gradient-${constKey}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={constellation.color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={constellation.color} stopOpacity="0.1" />
              </linearGradient>
            ))}
          </defs>
          
          {/* Clean connections from constellation centers to their quests */}
          {Object.entries(constellations).map(([constKey, constellation]) => 
            constellation.quests.map(quest => {
              const isCompleted = player.completedQuests.includes(quest.id);
              
              return (
                <line
                  key={`connection-${constKey}-${quest.id}`}
                  x1={`${constellation.position.x}%`}
                  y1={`${constellation.position.y}%`}
                  x2={`${quest.position.x}%`}
                  y2={`${quest.position.y}%`}
                  stroke={isCompleted ? constellation.color : `url(#gradient-${constKey})`}
                  strokeWidth={isCompleted ? "2" : "1"}
                  style={{ 
                    opacity: isCompleted ? 0.8 : 0.2,
                    transition: 'all 0.3s ease-in-out'
                  }}
                />
              );
            })
          )}
        </svg>

        {/* Quest nodes */}
        {allQuests.map((quest) => {
          const isCompleted = player.completedQuests.includes(quest.id);
          const isConstellation = quest.isConstellation;
          const streak = player.streaks[quest.id] || 0;
          const hasComment = player.comments[quest.id];

          return (
            <div
              key={quest.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{
                left: `${quest.position.x}%`,
                top: `${quest.position.y}%`,
                zIndex: isConstellation ? 3 : 2
              }}
              onClick={() => {
                if (!isConstellation) {
                  toggleQuest(quest.id);
                } else {
                  setActiveConstellation(quest.constellation);
                }
              }}
            >
              {/* Node glow effect */}
              <div 
                className={`absolute inset-0 rounded-full animate-pulse ${
                  isConstellation ? 'w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20' : 'w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12'
                }`}
                style={{
                  background: `radial-gradient(circle, ${quest.color || '#06b6d4'}40, transparent)`,
                  transform: 'scale(2)',
                  opacity: isCompleted ? 0.8 : 0.4
                }}
              />
              
              {/* Main node */}
              <div
                className={`relative rounded-full border-2 sm:border-4 transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-2xl ${
                  isConstellation 
                    ? 'w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border-white/50' 
                    : isCompleted 
                      ? 'w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 border-green-400 bg-green-500/80' 
                      : 'w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 border-white/40 bg-white/10 hover:bg-white/20'
                }`}
                style={{
                  backgroundColor: isConstellation ? `${quest.color}80` : undefined,
                  borderColor: isConstellation ? quest.color : undefined,
                  boxShadow: `0 0 ${isConstellation ? '30px' : '20px'} ${quest.color || '#06b6d4'}40`
                }}
              >
                {/* Icon */}
                <quest.icon 
                  className={`${isConstellation ? 'w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8' : 'w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5'} text-white`}
                  style={{ 
                    color: isCompleted && !isConstellation ? '#ffffff' : quest.color || '#ffffff'
                  }}
                />
                
                {/* Completion checkmark */}
                {isCompleted && !isConstellation && (
                  <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                    <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                  </div>
                )}
                
                {/* Streak indicator */}
                {streak > 0 && !isConstellation && (
                  <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full px-1 sm:px-2 py-0.5 sm:py-1 flex items-center gap-1 shadow-lg">
                    <Flame className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                    <span className="text-xs font-bold text-white">{streak}</span>
                  </div>
                )}
                
                {/* Comment indicator */}
                {hasComment && !isConstellation && (
                  <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                  </div>
                )}
              </div>
              
              {/* Enhanced Tooltip with Quest Info */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                <div className="bg-black/95 backdrop-blur-md px-3 py-2 rounded-xl border border-white/30 text-center min-w-max shadow-2xl max-w-xs">
                  <div className="text-sm font-bold text-white">{quest.name}</div>
                  {!isConstellation && (
                    <>
                      <div className="text-xs text-gray-300 mt-1 flex items-center justify-center gap-2">
                        <span>+{quest.exp} XP</span>
                        <span>•</span>
                        <span>{isCompleted ? 'Completed' : 'Available'}</span>
                      </div>
                      {quest.category && (
                        <div className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full border ${getDifficultyColor(quest.difficulty)}`}>
                            {quest.difficulty}
                          </span>
                          <span>•</span>
                          <span>{quest.timeEstimate}</span>
                        </div>
                      )}
                      {quest.category && (
                        <div className="text-xs text-purple-300 mt-1">
                          📂 {quest.category}
                        </div>
                      )}
                    </>
                  )}
                  {isConstellation && (
                    <div className="text-xs text-gray-300 mt-1">
                      {getConstellationProgress(quest.constellation).completed}/{getConstellationProgress(quest.constellation).total} completed
                      <div className="text-xs text-purple-300 mt-1">
                        📂 {quest.category}
                      </div>
                    </div>
                  )}
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black/95" />
              </div>
            </div>
          );
        })}

        {/* Floating particles for ambiance */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute animate-float opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 8 + 4}s`
            }}
          >
            <div 
              className="w-1 h-1 rounded-full"
              style={{
                backgroundColor: ['#06b6d4', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)]
              }}
            />
          </div>
        ))}
      </div>
    );
  };

  // Start Screen Component
  if (showGuide) {
    return <GuidePage />;
  }

  if (showShop) {
    return <ShopPage />;
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col relative overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute bg-white rounded-full animate-float opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 8 + 4}s`
              }}
            />
          ))}
          
          {/* Large decorative stars */}
          {[...Array(12)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              <Star className="w-6 h-6 text-yellow-300 opacity-40" />
            </div>
          ))}
        </div>

        {/* Floating Mascot */}
        <div className="absolute top-8 sm:top-16 right-2 sm:right-4 z-20 animate-mascot-entrance">
          <div className="relative animate-float-gentle">
            <AnimatedMascot />
            {showMascot && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 sm:mt-4 bg-black/80 backdrop-blur-md px-3 sm:px-4 py-2 rounded-xl border border-white/30 max-w-36 sm:max-w-48 animate-bubble-pop">
                <div className="text-xs sm:text-sm text-center text-white">{mascotMessage}</div>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black/80" />
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 text-center relative z-10">
          {/* Main Logo */}
          <div className="mb-6 sm:mb-8 animate-scale-in">
            <div className="relative mb-6 sm:mb-8">
              <div className="absolute inset-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mx-auto rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-30 animate-pulse blur-xl" />
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-auto rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 border-2 sm:border-4 border-white/30 flex items-center justify-center shadow-2xl animate-glow">
                <Star className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-white animate-spin-slow" />
              </div>
            </div>
            
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 sm:mb-4">
              ✨ Constellation Quest
            </h1>
            
            <p className="text-base sm:text-xl text-gray-300 max-w-xs sm:max-w-md mx-auto leading-relaxed px-4 mb-6 sm:mb-8">
              Navigate the cosmos and transform your habits into stellar achievements
            </p>
          </div>

          {/* Constellation Topics Preview */}
          <div className="mb-6 sm:mb-8 w-full max-w-4xl">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Explore Five Cosmic Realms</h2>
            
            {/* 2x2 Grid for first 4 constellations */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 px-4 mb-2 sm:mb-3 max-w-2xl mx-auto">
              {Object.entries(constellations).slice(0, 4).map(([key, constellation]) => (
                <div
                  key={key}
                  className="bg-white/5 backdrop-blur-md rounded-lg sm:rounded-xl p-2 sm:p-3 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/10"
                  style={{ 
                    boxShadow: `0 0 15px ${constellation.color}15`,
                  }}
                >
                  <div 
                    className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1 sm:mb-2 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${constellation.color}20`, border: `2px solid ${constellation.color}40` }}
                  >
                    <constellation.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: constellation.color }} />
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm mb-1" style={{ color: constellation.color }}>
                    {constellation.name}
                  </h3>
                  <p className="text-xs text-gray-300 mb-1 leading-snug">
                    {constellation.description}
                  </p>
                  <div className="text-xs text-gray-400">
                    📂 {constellation.category}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {constellation.quests.length} quests
                  </div>
                </div>
              ))}
            </div>
            
            {/* Centered 5th constellation (Social) */}
            <div className="flex justify-center px-4">
              {Object.entries(constellations).slice(4, 5).map(([key, constellation]) => (
                <div
                  key={key}
                  className="bg-white/5 backdrop-blur-md rounded-lg sm:rounded-xl p-2 sm:p-3 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/10 w-full max-w-xs"
                  style={{ 
                    boxShadow: `0 0 15px ${constellation.color}15`,
                  }}
                >
                  <div 
                    className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1 sm:mb-2 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${constellation.color}20`, border: `2px solid ${constellation.color}40` }}
                  >
                    <constellation.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: constellation.color }} />
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm mb-1" style={{ color: constellation.color }}>
                    {constellation.name}
                  </h3>
                  <p className="text-xs text-gray-300 mb-1 leading-snug">
                    {constellation.description}
                  </p>
                  <div className="text-xs text-gray-400">
                    📂 {constellation.category}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {constellation.quests.length} quests
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Each constellation contains unique quests designed to help you build meaningful habits. 
              Complete quests to earn XP, unlock rewards, and watch your cosmic map come alive with vibrant connections.
            </div>
          </div>

          {/* Username Input */}
          <div className="bg-black/40 backdrop-blur-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/20 mb-4 sm:mb-6 shadow-2xl w-full max-w-xs sm:max-w-sm">
            <div className="text-xs sm:text-sm text-gray-300 text-center mb-3 sm:mb-4 flex items-center justify-center gap-2">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
              Enter Your Explorer Name
            </div>
            <input
              type="text"
              placeholder="Enter your name (optional)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 sm:p-4 bg-black/40 border border-white/30 rounded-xl sm:rounded-2xl text-white placeholder-gray-400 text-center focus:border-cyan-400 focus:outline-none transition-all text-sm sm:text-base"
              maxLength={20}
            />
          </div>
          
          <div className="space-y-3 sm:space-y-4 w-full max-w-xs sm:max-w-sm">
            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-600 px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 sm:gap-3"
            >
              <Play className="w-5 h-5 sm:w-7 sm:h-7" />
              Begin Your Quest
              <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>
            
            <button
              onClick={() => setShowGuide(true)}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
              How to Play Guide
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Game Component
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-md border-b border-white/20 p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-base sm:text-lg">Level {Math.floor(player.totalExp / 500) + 1}</div>
              <div className="text-xs text-gray-300">{player.name}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative">
              <AnimatedMascot size="small" />
              <button
                onClick={() => {
                  const randomMessage = mascotMessages[Math.floor(Math.random() * mascotMessages.length)];
                  setMascotMessage(randomMessage);
                  setShowMascot(true);
                  setTimeout(() => setShowMascot(false), 4000);
                }}
                className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white hover:scale-110 transition-transform"
              >
                <MessageCircle className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
              </button>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
                <span className="font-bold text-cyan-400 text-xs sm:text-sm">{player.totalExp}</span>
              </div>
              <div className="flex items-center gap-1">
                <Coins className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                <span className="font-bold text-yellow-400 text-xs sm:text-sm">{player.coins}</span>
              </div>
              <button
                onClick={() => setShowGuide(true)}
                className="w-6 h-6 sm:w-8 sm:h-8 bg-white/10 hover:bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center transition-colors border border-white/20"
              >
                <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300 hover:text-white" />
              </button>
              <button
                onClick={() => setShowShop(true)}
                className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg sm:rounded-xl flex items-center justify-center transition-colors border border-yellow-400/30"
              >
                <Gift className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/10 rounded-full h-2 sm:h-3 mb-2 sm:mb-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-cyan-400 to-purple-600 h-full rounded-full transition-all duration-700 relative"
            style={{ width: `${(player.totalExp % 500) / 500 * 100}%` }}
          >
            <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse" />
          </div>
        </div>
        
        <div className="text-center text-xs text-gray-300">
          {player.totalExp % 500} / 500 XP to next level
        </div>
      </div>

      {/* Mascot Speech Bubble */}
      {showMascot && gameStarted && (
        <div className="fixed top-16 sm:top-24 right-2 sm:right-4 z-40 animate-bounce">
          <div className="bg-black/90 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-white/30 max-w-44 sm:max-w-56 shadow-2xl">
            <div className="text-xs sm:text-sm text-center text-white flex items-center gap-2">
              <Smile className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" />
              {mascotMessage}
            </div>
            <div className="absolute bottom-full right-6 sm:right-8 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black/90" />
            <button
              onClick={() => setShowMascot(false)}
              className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content - Constellation Map */}
      <div className="flex-1 p-3 sm:p-4">
        <div className="mb-3 sm:mb-4 text-center">
          <h2 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">Your Quest Constellation</h2>
          <p className="text-gray-300 text-sm sm:text-base">Navigate the stars and complete your cosmic journey</p>
        </div>
        
        <ConstellationMap />
        
        <div className="mt-3 sm:mt-4 flex justify-center">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-medium transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            Add Custom Quest
          </button>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="bg-black/30 backdrop-blur-md border-t border-white/20 p-3 sm:p-4">
        <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
          <div className="bg-white/10 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-white/20">
            <div className="text-lg sm:text-xl font-bold text-green-400">{player.completedQuests.length}</div>
            <div className="text-xs text-gray-400">Completed</div>
          </div>
          <div className="bg-white/10 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-white/20">
            <div className="text-lg sm:text-xl font-bold text-orange-400">{Object.keys(player.streaks).length}</div>
            <div className="text-xs text-gray-400">Streaks</div>
          </div>
          <div className="bg-white/10 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-white/20">
            <div className="text-lg sm:text-xl font-bold text-purple-400">{player.level}</div>
            <div className="text-xs text-gray-400">Level</div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCommentModal && selectedQuest && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md border border-white/20 shadow-2xl">
            <div className="text-center mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-2xl">
                <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-blue-400 mb-2">Quest Reflection</h3>
              <p className="text-gray-300 font-medium text-sm sm:text-base break-words">"{selectedQuest.name}"</p>
              {selectedQuest.category && (
                <div className="mt-2 flex items-center justify-center gap-2 text-xs">
                  <span className={`px-2 py-1 rounded-full border ${getDifficultyColor(selectedQuest.difficulty)}`}>
                    {selectedQuest.difficulty}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">{selectedQuest.timeEstimate}</span>
                </div>
              )}
            </div>
            
            <div className="mb-4 sm:mb-6">
              <textarea
                placeholder="How did it feel? What did you learn?"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full p-3 sm:p-4 bg-black/40 border border-white/20 rounded-xl sm:rounded-2xl text-white placeholder-gray-400 h-24 sm:h-28 resize-none focus:border-purple-400 focus:outline-none transition-all text-sm sm:text-base"
                rows="3"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={skipReflection}
                className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-medium transition-all hover:scale-105 text-sm sm:text-base"
              >
                Skip
              </button>
              <button
                onClick={saveComment}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-medium transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                Create Custom Quest
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-700 hover:bg-gray-600 rounded-lg sm:rounded-xl flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-white" />
              </button>
            </div>
            
            <div className="mb-4 sm:mb-6">
              <label className="block text-sm font-medium mb-2 sm:mb-3 text-gray-200">
                What would you like to accomplish?
              </label>
              <input
                type="text"
                placeholder="e.g., Practice guitar for 20 minutes"
                value={newQuestText}
                onChange={(e) => setNewQuestText(e.target.value)}
                className="w-full p-3 sm:p-4 bg-black/40 border border-white/20 rounded-xl sm:rounded-2xl text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-all text-sm sm:text-base"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all hover:scale-105 text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={addCustomQuest}
                disabled={!newQuestText.trim()}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                Add Quest
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {notification && (
        <div className={`fixed top-16 sm:top-24 left-2 right-2 sm:left-4 sm:right-4 z-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl backdrop-blur-md shadow-2xl transition-all duration-500 ${
          notification.type === 'success' 
            ? 'bg-green-500/90 border-2 border-green-400' 
            : 'bg-red-500/90 border-2 border-red-400'
        }`}>
          <div className="font-medium text-white text-center flex items-center justify-center gap-2 text-sm sm:text-base">
            {notification.type === 'success' ? (
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
            ) : (
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
            {notification.message}
          </div>
        </div>
      )}

      {/* Celebration Animation */}
      {showCelebration && celebrationQuest && (
        <CelebrationAnimation quest={celebrationQuest} />
      )}

      {/* Enhanced Keyframes and Styles */}
      <style jsx>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          height: 100vh;
          width: 100vw;
        }
        
        #root {
          height: 100vh;
          width: 100vw;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(2deg); }
          50% { transform: translateY(-20px) rotate(0deg); }
          75% { transform: translateY(-10px) rotate(-2deg); }
        }
        
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(20px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(20px) rotate(-360deg); }
        }
        
        @keyframes orbit-reverse {
          0% { transform: rotate(0deg) translateX(25px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(25px) rotate(360deg); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.8), 0 0 60px rgba(236, 72, 153, 0.6); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
          50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8), 0 0 60px rgba(59, 130, 246, 0.6); }
        }
        
        @keyframes confetti {
          0% { 
            transform: translateY(-100vh) rotate(0deg) scale(1);
            opacity: 1;
          }
          100% { 
            transform: translateY(100vh) rotate(720deg) scale(0.5);
            opacity: 0;
          }
        }
        
        @keyframes celebration-bounce {
          0% { 
            transform: scale(0.3) translateY(-100px);
            opacity: 0;
          }
          50% { 
            transform: scale(1.1) translateY(-10px);
            opacity: 1;
          }
          70% { 
            transform: scale(0.95) translateY(5px);
          }
          100% { 
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes celebration-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes text-glow {
          0%, 100% { 
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
          }
          50% { 
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6);
          }
        }
        
        @keyframes mascot-entrance {
          0% { 
            transform: translateX(200px) translateY(-50px) scale(0.5);
            opacity: 0;
          }
          60% { 
            transform: translateX(-10px) translateY(10px) scale(1.1);
            opacity: 1;
          }
          100% { 
            transform: translateX(0) translateY(0) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes bubble-pop {
          0% { 
            transform: translate(-50%, 20px) scale(0.3);
            opacity: 0;
          }
          60% { 
            transform: translate(-50%, -5px) scale(1.1);
            opacity: 1;
          }
          100% { 
            transform: translate(-50%, 0) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-gentle {
          animation: float-gentle 4s ease-in-out infinite;
        }
        
        .animate-orbit {
          animation: orbit 8s linear infinite;
        }
        
        .animate-orbit-reverse {
          animation: orbit-reverse 10s linear infinite;
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
        
        .animate-confetti {
          animation: confetti linear forwards;
        }
        
        .animate-celebration-bounce {
          animation: celebration-bounce 1s ease-out;
        }
        
        .animate-celebration-pulse {
          animation: celebration-pulse 2s ease-in-out infinite;
        }
        
        .animate-text-glow {
          animation: text-glow 2s ease-in-out infinite;
        }
        
        .animate-mascot-entrance {
          animation: mascot-entrance 2s ease-out;
        }
        
        .animate-bubble-pop {
          animation: bubble-pop 0.6s ease-out;
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .constellation-map {
            min-height: 250px;
          }
        }
      `}</style>
    </div>
  );
};

export default ConstellationToDoApp;