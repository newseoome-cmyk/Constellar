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
  const [activeTab, setActiveTab] = useState('quests'); // 'quests' or 'shop'
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

  // Constellation quest data
  const constellations = {
    wellness: {
      name: 'Wellness',
      icon: Heart,
      color: '#ec4899',
      description: 'Nurture your mind and body',
      quests: [
        { id: 'morning_coffee', name: 'Morning Coffee Ritual', exp: 20, icon: Coffee },
        { id: 'daily_reading', name: 'Read for 30 minutes', exp: 40, icon: BookOpen },
        { id: 'meditation', name: 'Meditate 10 minutes', exp: 35, icon: Star },
        { id: 'gratitude_journal', name: 'Write 3 things I\'m grateful for', exp: 30, icon: Heart },
        { id: 'nature_walk', name: 'Take a walk in nature', exp: 45, icon: Sun }
      ]
    },
    fitness: {
      name: 'Fitness',
      icon: Dumbbell,
      color: '#f97316',
      description: 'Build strength and vitality',
      quests: [
        { id: 'workout_basic', name: 'Basic workout routine', exp: 50, icon: Dumbbell },
        { id: 'water_intake', name: 'Drink 8 glasses of water', exp: 25, icon: Target },
        { id: 'steps_goal', name: 'Walk 10,000 steps', exp: 40, icon: Target },
        { id: 'stretching', name: 'Stretch for 15 minutes', exp: 30, icon: Dumbbell },
        { id: 'healthy_meal', name: 'Cook a healthy meal', exp: 45, icon: Heart }
      ]
    },
    learning: {
      name: 'Learning',
      icon: BookOpen,
      color: '#3b82f6',
      description: 'Expand your knowledge',
      quests: [
        { id: 'skill_practice', name: 'Practice new skill', exp: 60, icon: Target },
        { id: 'online_course', name: 'Complete course module', exp: 80, icon: BookOpen },
        { id: 'podcast_listen', name: 'Listen to educational podcast', exp: 35, icon: Play },
        { id: 'article_read', name: 'Read industry article', exp: 40, icon: BookOpen },
        { id: 'notes_review', name: 'Review and organize notes', exp: 25, icon: Star }
      ]
    },
    creativity: {
      name: 'Creativity',
      icon: Palette,
      color: '#8b5cf6',
      description: 'Express your artistic side',
      quests: [
        { id: 'creative_write', name: 'Write creatively for 30 min', exp: 55, icon: Palette },
        { id: 'photo_project', name: 'Take artistic photos', exp: 40, icon: Target },
        { id: 'draw_sketch', name: 'Draw or sketch something', exp: 45, icon: Palette },
        { id: 'music_practice', name: 'Practice musical instrument', exp: 50, icon: Star },
        { id: 'craft_project', name: 'Work on craft project', exp: 60, icon: Gift }
      ]
    },
    social: {
      name: 'Social',
      icon: Users,
      color: '#10b981',
      description: 'Connect and contribute',
      quests: [
        { id: 'friend_call', name: 'Call a friend or family', exp: 40, icon: Users },
        { id: 'help_someone', name: 'Help someone today', exp: 50, icon: Heart },
        { id: 'compliment_give', name: 'Give genuine compliment', exp: 25, icon: Star },
        { id: 'community_engage', name: 'Engage in community activity', exp: 60, icon: Users },
        { id: 'team_collaborate', name: 'Collaborate on team project', exp: 55, icon: Target }
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
    let quest = constellations[activeConstellation].quests.find(q => q.id === questId);
    if (!quest) {
      quest = (player.customQuests[activeConstellation] || []).find(q => q.id === questId);
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
        isCustom: true
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

    const sizeClasses = size === 'large' ? 'w-24 h-24' : 'w-16 h-16';
    
    return (
      <div className={`${sizeClasses} relative ${bounce ? 'animate-bounce' : ''} transition-all duration-300`}>
        {/* Mascot Body */}
        <div className="w-full h-full bg-gradient-to-br from-cyan-300 via-blue-400 to-purple-500 rounded-full border-4 border-white/30 shadow-2xl relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute inset-1 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
          
          {/* Eyes */}
          <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white rounded-full animate-pulse" />
          
          {/* Smile */}
          <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2">
            <div className="w-4 h-2 border-b-2 border-white rounded-full" />
          </div>
          
          {/* Sparkles around mascot */}
          <div className="absolute -top-2 -left-2 w-3 h-3">
            <Sparkles className="w-3 h-3 text-yellow-300 animate-pulse" />
          </div>
          <div className="absolute -top-1 -right-3 w-2 h-2">
            <Star className="w-2 h-2 text-pink-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <div className="absolute -bottom-2 -right-1 w-2 h-2">
            <Target className="w-2 h-2 text-cyan-300 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    );
  };

  // Celebration Animation Component
  const CelebrationAnimation = ({ quest }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
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
                className="w-3 h-3 rotate-45"
                style={{
                  backgroundColor: ['#fbbf24', '#10b981', '#8b5cf6', '#ef4444', '#06b6d4'][Math.floor(Math.random() * 5)]
                }}
              />
            </div>
          ))}
        </div>

        {/* Main celebration card */}
        <div className="bg-gradient-to-br from-yellow-400/90 to-orange-500/90 p-8 rounded-3xl border-4 border-yellow-300 shadow-2xl animate-celebration-bounce max-w-sm mx-4 text-center">
          <div className="animate-celebration-pulse">
            <Trophy className="w-20 h-20 text-white mx-auto mb-4 drop-shadow-lg animate-spin-slow" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2 animate-text-glow">
            QUEST COMPLETE!
          </h2>
          
          <p className="text-xl text-yellow-100 mb-4 font-medium">
            {quest?.name}
          </p>
          
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <Zap className="w-6 h-6 text-yellow-200" />
              <span className="text-xl font-bold text-white">+{quest?.expGain || quest?.exp}</span>
              {quest?.expGain && quest?.expGain > quest?.exp && (
                <span className="text-sm text-cyan-200">(Boosted!)</span>
              )}
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <Coins className="w-6 h-6 text-yellow-200" />
              <span className="text-xl font-bold text-white">+{quest?.coinGain || Math.floor(quest?.exp / 2)}</span>
              {quest?.coinGain && quest?.coinGain > Math.floor(quest?.exp / 2) && (
                <span className="text-sm text-yellow-200">(Boosted!)</span>
              )}
            </div>
          </div>
          
          <div className="text-lg text-yellow-100 font-medium animate-pulse">
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
        <div className="bg-black/30 backdrop-blur-md border-b border-white/20 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Cosmic Shop</h1>
              <p className="text-sm text-gray-300">Spend your hard-earned coins</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-2 rounded-xl border border-yellow-400/30">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className="font-bold text-yellow-400">{player.coins}</span>
            </div>
            <button
              onClick={() => setShowShop(false)}
              className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="bg-black/20 border-b border-white/10 p-3">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl transition-all duration-300 capitalize ${
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
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredItems.map((item) => {
            const isOwned = player.inventory.includes(item.id);
            const canAfford = player.coins >= item.price;
            
            return (
              <div 
                key={item.id}
                className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
                  isOwned 
                    ? 'bg-green-500/20 border-green-500/50' 
                    : 'bg-white/5 border-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    item.category === 'theme' ? 'bg-gradient-to-br' : 'bg-purple-600/30'
                  }`}
                  style={item.category === 'theme' ? { background: item.preview } : {}}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-white">{item.name}</h3>
                      {isOwned && <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">Owned</div>}
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Coins className="w-5 h-5 text-yellow-400" />
                        <span className="text-yellow-400 font-bold">{item.price}</span>
                        {item.uses && (
                          <span className="text-gray-400 text-sm">• {item.uses} uses</span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => purchaseItem(item)}
                        disabled={isOwned || !canAfford}
                        className={`px-6 py-2 rounded-xl font-medium transition-all ${
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
        title: "Choose Your Constellation",
        icon: Target,
        color: "#8b5cf6",
        content: "Explore 5 different constellations: Wellness (heart & mind), Fitness (strength & vitality), Learning (expand knowledge), Creativity (express yourself), and Social (connect with others)."
      },
      {
        title: "Complete Quests",
        icon: CheckCircle,
        color: "#10b981",
        content: "Click the checkbox next to any quest to mark it complete. You'll earn XP and coins, plus unlock the reflection modal to share your experience!"
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
      },
      {
        title: "Meet Your Mascot",
        icon: Smile,
        color: "#06b6d4",
        content: "Your friendly space companion will cheer you on with encouraging messages! Click the chat bubble to get motivational messages anytime."
      },
      {
        title: "Create Custom Quests",
        icon: Plus,
        color: "#8b5cf6",
        content: "Add your own personalized quests using the 'Add Custom Quest' button. Make the app truly yours with habits that matter to you!"
      }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col">
        {/* Guide Header */}
        <div className="bg-black/30 backdrop-blur-md border-b border-white/20 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Quest Guide</h1>
              <p className="text-sm text-gray-300">Learn how to master your journey</p>
            </div>
          </div>
          <button
            onClick={() => setShowGuide(false)}
            className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Floating Mascot */}
        <div className="fixed top-24 right-4 z-20 animate-float-gentle">
          <AnimatedMascot size="small" />
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black/80 backdrop-blur-md px-3 py-1 rounded-xl border border-white/30 max-w-32 animate-slide-in">
            <div className="text-xs text-center text-white">
              Let's learn together! 📚
            </div>
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-black/80" />
          </div>
        </div>

        {/* Guide Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {guideSteps.map((step, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                {/* Step Number & Icon */}
                <div className="flex-shrink-0">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center border-2 shadow-lg relative overflow-hidden"
                    style={{ 
                      backgroundColor: `${step.color}20`, 
                      borderColor: step.color,
                      boxShadow: `0 0 20px ${step.color}30`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    <step.icon className="w-8 h-8 relative z-10" style={{ color: step.color }} />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold mb-3 text-white">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    {step.content}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Final Tips Section */}
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md p-6 rounded-2xl border border-purple-400/30 mt-8">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <h3 className="text-lg font-bold text-white">Pro Tips</h3>
            </div>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                <p>Start small! Pick 1-2 quests per day and build consistency before adding more.</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                <p>Use reflections to track how habits make you feel and what works best for you.</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0" />
                <p>Focus on building streaks rather than completing everything at once.</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <p>Celebrate small wins - every quest completed is progress toward your goals!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="bg-black/30 backdrop-blur-md border-t border-white/20 p-4">
          <button
            onClick={() => setShowGuide(false)}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-4 rounded-2xl font-medium transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-5 h-5" />
            Ready to Start Your Quest!
          </button>
        </div>
      </div>
    );
  };

  // Start Screen Component with Enhanced Animations
  if (showGuide) {
    return <GuidePage />;
  }

  // Start Screen Component with Enhanced Animations
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col relative overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0">
          {/* Floating particles */}
          {[...Array(80)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute bg-white rounded-full animate-float opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 8 + 4}s`
              }}
            />
          ))}
          
          {/* Shooting stars */}
          {[...Array(3)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute animate-shooting-star opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                animationDelay: `${i * 4 + Math.random() * 2}s`,
                animationDuration: '3s'
              }}
            >
              <div className="w-1 h-1 bg-white rounded-full shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent w-20 h-px transform -translate-x-full animate-trail" />
              </div>
            </div>
          ))}
          
          {/* Constellation lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <path
              d="M100,200 Q300,100 500,200 T900,200"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              className="animate-draw"
            />
            <path
              d="M200,400 Q400,300 600,400 T1000,400"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              className="animate-draw"
              style={{ animationDelay: '1s' }}
            />
            <path
              d="M50,300 Q200,250 350,300 T600,300"
              stroke="url(#lineGradient)"
              strokeWidth="1"
              fill="none"
              className="animate-draw"
              style={{ animationDelay: '2s' }}
            />
          </svg>
          
          {/* Pulsing light orbs */}
          {[...Array(5)].map((_, i) => (
            <div
              key={`orb-${i}`}
              className="absolute animate-pulse-slow"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 1.5}s`
              }}
            >
              <div 
                className="w-4 h-4 rounded-full blur-sm"
                style={{
                  background: ['#06b6d4', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'][i],
                  boxShadow: `0 0 20px ${['#06b6d4', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'][i]}`
                }}
              />
            </div>
          ))}
        </div>

        {/* Floating Mascot with Enhanced Animation */}
        <div className="absolute top-16 right-4 z-20 animate-mascot-entrance">
          <div className="relative animate-float-gentle">
            <AnimatedMascot />
            {showMascot && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/30 max-w-48 animate-bubble-pop">
                <div className="text-sm text-center text-white animate-typewriter">
                  {mascotMessage}
                </div>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black/80" />
              </div>
            )}
          </div>
          
          {/* Sparkle trail for mascot */}
          {[...Array(3)].map((_, i) => (
            <div
              key={`mascot-sparkle-${i}`}
              className="absolute animate-sparkle-trail opacity-60"
              style={{
                left: `${20 + i * 15}px`,
                top: `${30 + i * 10}px`,
                animationDelay: `${i * 0.3}s`
              }}
            >
              <Sparkles className="w-3 h-3 text-yellow-300" />
            </div>
          ))}
        </div>

        {/* Floating Elements with Enhanced Animations */}
        <div className="absolute top-20 left-8 animate-orbit" style={{ animationDelay: '0.5s' }}>
          <Star className="w-10 h-10 text-yellow-400 opacity-80 animate-pulse" />
        </div>
        <div className="absolute top-40 right-20 animate-orbit-reverse" style={{ animationDelay: '1s' }}>
          <Sparkles className="w-8 h-8 text-purple-400 opacity-80 animate-pulse" />
        </div>
        <div className="absolute bottom-60 left-12 animate-orbit" style={{ animationDelay: '1.5s' }}>
          <Target className="w-9 h-9 text-cyan-400 opacity-80 animate-pulse" />
        </div>
        <div className="absolute top-60 left-1/2 animate-orbit-reverse" style={{ animationDelay: '2s' }}>
          <Heart className="w-8 h-8 text-pink-400 opacity-80 animate-pulse" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative z-10">
          {/* Enhanced Main Logo/Title */}
          <div className="mb-8 animate-scale-in">
            <div className="relative mb-8">
              {/* Outer glow ring */}
              <div className="absolute inset-0 w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-30 animate-pulse blur-xl" />
              
              {/* Main logo */}
              <div className="relative w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 border-4 border-white/30 flex items-center justify-center shadow-2xl animate-glow">
                <Star className="w-16 h-16 text-white animate-spin-slow" />
              </div>
              
              {/* Orbiting elements */}
              <div className="absolute inset-0 w-40 h-40 mx-auto animate-spin-slow">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
                  <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse" />
                </div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                </div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 animate-title-wave">
              ✨ Constellation Quest
            </h1>
            
            <p className="text-xl text-gray-300 max-w-md mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Transform your daily habits into an epic adventure through the cosmos
            </p>
          </div>

          {/* Enhanced Feature Preview Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8 w-full max-w-sm animate-stagger-in" style={{ animationDelay: '0.6s' }}>
            {Object.entries(constellations).slice(0, 4).map(([key, constellation], index) => (
              <div 
                key={key} 
                className="bg-black/30 backdrop-blur-md p-5 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl group animate-card-float"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <div className="relative">
                  <constellation.icon 
                    className="w-10 h-10 mb-3 mx-auto group-hover:scale-110 transition-transform" 
                    style={{ color: constellation.color }} 
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="w-3 h-3 text-yellow-900" />
                  </div>
                </div>
                <div className="text-sm font-bold text-center text-white">{constellation.name}</div>
                <div className="text-xs text-gray-400 text-center mt-1">{constellation.description}</div>
              </div>
            ))}
          </div>

          {/* Enhanced Stats Preview */}
          <div className="bg-black/40 backdrop-blur-md p-6 rounded-3xl border border-white/20 mb-10 w-full max-w-sm animate-slide-up-bounce shadow-2xl" style={{ animationDelay: '1s' }}>
            <div className="text-sm text-gray-300 text-center mb-4 flex items-center justify-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400" />
              Your Stellar Progress
            </div>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="animate-counter">
                <div className="text-3xl font-bold text-cyan-400 animate-number-pop">{player.level}</div>
                <div className="text-xs text-gray-400 mt-1">Level</div>
              </div>
              <div className="animate-counter" style={{ animationDelay: '0.2s' }}>
                <div className="text-3xl font-bold text-yellow-400 animate-number-pop">{player.totalExp}</div>
                <div className="text-xs text-gray-400 mt-1">Experience</div>
              </div>
              <div className="animate-counter" style={{ animationDelay: '0.4s' }}>
                <div className="text-3xl font-bold text-green-400 animate-number-pop">{player.completedQuests.length}</div>
                <div className="text-xs text-gray-400 mt-1">Completed</div>
              </div>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="space-y-4 w-full max-w-sm">
            {/* Username Input */}
            <div className="bg-black/40 backdrop-blur-md p-6 rounded-3xl border border-white/20 mb-6 shadow-2xl animate-slide-up-bounce" style={{ animationDelay: '1s' }}>
              <div className="text-sm text-gray-300 text-center mb-4 flex items-center justify-center gap-2">
                <Star className="w-4 h-4 text-cyan-400" />
                Enter Your Explorer Name
              </div>
              <input
                type="text"
                placeholder="Enter your name (optional)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 bg-black/40 border border-white/30 rounded-2xl text-white placeholder-gray-400 text-center focus:border-cyan-400 focus:outline-none transition-all focus:shadow-lg focus:shadow-cyan-500/20 text-lg font-medium"
                maxLength={20}
              />
              <div className="text-xs text-gray-400 text-center mt-2">
                Leave empty for "Explorer"
              </div>
            </div>
            
            <button
              onClick={startGame}
              className="group w-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-600 px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-purple-500/40 animate-pulse-glow flex items-center justify-center gap-3"
              style={{ animationDelay: '1.2s' }}
            >
              <Play className="w-7 h-7 group-hover:scale-110 transition-transform" />
              Begin Your Quest
              <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
            </button>

            {player.completedQuests.length > 0 && (
              <button
                onClick={startGame}
                className="w-full bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-105 animate-fade-in-up flex items-center justify-center gap-2"
                style={{ animationDelay: '1.4s' }}
              >
                <Trophy className="w-5 h-5 text-yellow-400" />
                Continue Journey
              </button>
            )}
            
            {/* Guide Button */}
            <button
              onClick={() => setShowGuide(true)}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 px-6 py-3 rounded-2xl font-medium transition-all duration-300 hover:scale-105 animate-fade-in-up flex items-center justify-center gap-2 text-sm"
              style={{ animationDelay: '1.6s' }}
            >
              <BookOpen className="w-4 h-4" />
              How to Play Guide
            </button>
          </div>
        </div>

        {/* Enhanced Bottom Info */}
        <div className="p-6 text-center relative z-10">
          <div className="text-sm text-gray-400 animate-fade-in-up flex items-center justify-center gap-2" style={{ animationDelay: '1.6s' }}>
            <Star className="w-4 h-4 text-yellow-400" />
            Complete quests • Earn experience • Build streaks • Level up
            <Star className="w-4 h-4 text-yellow-400" />
          </div>
        </div>
      </div>
    );
  }

  // Main Game Component (Mobile Layout) with Mascot Integration
  const activeConst = constellations[activeConstellation];

  // Get theme colors based on equipped theme
  const getThemeColors = () => {
    switch (player.equippedTheme) {
      case 'golden_theme':
        return {
          primary: 'from-yellow-400 to-orange-500',
          secondary: 'from-amber-500 to-yellow-600',
          accent: '#fbbf24'
        };
      case 'emerald_theme':
        return {
          primary: 'from-green-400 to-emerald-500',
          secondary: 'from-emerald-500 to-teal-600',
          accent: '#10b981'
        };
      case 'ruby_theme':
        return {
          primary: 'from-red-400 to-pink-500',
          secondary: 'from-rose-500 to-red-600',
          accent: '#ef4444'
        };
      default:
        return {
          primary: 'from-cyan-400 to-purple-600',
          secondary: 'from-purple-600 to-blue-600',
          accent: '#06b6d4'
        };
    }
  };

  const themeColors = getThemeColors();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col">
      
      {/* Mobile Header with Mascot and Active Boosts */}
      <div className="bg-black/30 backdrop-blur-md border-b border-white/20 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${themeColors.primary} rounded-full flex items-center justify-center`}>
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-lg">Level {Math.floor(player.totalExp / 500) + 1}</div>
              <div className="text-xs text-gray-300">{player.name}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Mini Mascot */}
            <div className="relative">
              <AnimatedMascot size="small" />
              <button
                onClick={() => {
                  const randomMessage = mascotMessages[Math.floor(Math.random() * mascotMessages.length)];
                  setMascotMessage(randomMessage);
                  setShowMascot(true);
                  setTimeout(() => setShowMascot(false), 4000);
                }}
                className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white hover:scale-110 transition-transform"
              >
                <MessageCircle className="w-3 h-3 text-white" />
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-cyan-400 text-sm">{player.totalExp}</span>
              </div>
              <div className="flex items-center gap-1">
                <Coins className="w-4 h-4 text-yellow-400" />
                <span className="font-bold text-yellow-400 text-sm">{player.coins}</span>
              </div>
              <button
                onClick={() => setShowGuide(true)}
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors border border-white/20"
                title="Open Guide"
              >
                <BookOpen className="w-4 h-4 text-gray-300 hover:text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Boosts Display */}
        {Object.keys(player.activeBoosts).some(key => player.activeBoosts[key] > 0) && (
          <div className="mb-3 flex gap-2 flex-wrap">
            {player.activeBoosts.double_xp > 0 && (
              <div className="bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-400/30 flex items-center gap-1">
                <Zap className="w-3 h-3 text-cyan-400" />
                <span className="text-xs text-cyan-400 font-bold">2X XP ({player.activeBoosts.double_xp})</span>
              </div>
            )}
            {player.activeBoosts.coin_multiplier > 0 && (
              <div className="bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-400/30 flex items-center gap-1">
                <Coins className="w-3 h-3 text-yellow-400" />
                <span className="text-xs text-yellow-400 font-bold">+50% Coins ({player.activeBoosts.coin_multiplier})</span>
              </div>
            )}
            {player.activeBoosts.streak_shield > 0 && (
              <div className="bg-green-500/20 px-3 py-1 rounded-full border border-green-400/30 flex items-center gap-1">
                <Target className="w-3 h-3 text-green-400" />
                <span className="text-xs text-green-400 font-bold">Shield ({player.activeBoosts.streak_shield})</span>
              </div>
            )}
          </div>
        )}

        {/* Progress Bar */}
        <div className="bg-white/10 rounded-full h-3 mb-3 overflow-hidden">
          <div 
            className={`bg-gradient-to-r ${themeColors.primary} h-full rounded-full transition-all duration-700 relative`}
            style={{ width: `${(player.totalExp % 500) / 500 * 100}%` }}
          >
            <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse" />
          </div>
        </div>
        
        <div className="text-center text-xs text-gray-300">
          {player.totalExp % 500} / 500 XP to next level
        </div>
      </div>

      {/* Mascot Speech Bubble (when active) */}
      {showMascot && gameStarted && (
        <div className="fixed top-24 right-4 z-40 animate-bounce">
          <div className="bg-black/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/30 max-w-56 shadow-2xl">
            <div className="text-sm text-center text-white flex items-center gap-2">
              <Smile className="w-4 h-4 text-yellow-400 flex-shrink-0" />
              {mascotMessage}
            </div>
            <div className="absolute bottom-full right-8 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black/90" />
            <button
              onClick={() => setShowMascot(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-3 h-3 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Tab System - Quests vs Shop */}
      <div className="bg-black/20 border-b border-white/10 p-3">
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setActiveTab('quests')}
            className={`flex-1 py-3 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 font-medium ${
              activeTab === 'quests'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <Target className="w-5 h-5" />
            Quests
          </button>
          <button
            onClick={() => setActiveTab('shop')}
            className={`flex-1 py-3 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 font-medium ${
              activeTab === 'shop'
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <Gift className="w-5 h-5" />
            Shop
          </button>
        </div>
        
        {/* Show constellation tabs only for quests */}
        {activeTab === 'quests' && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {Object.entries(constellations).map(([key, constellation]) => {
              const progress = getConstellationProgress(key);
              const isActive = activeConstellation === key;
              
              return (
                <button
                  key={key}
                  onClick={() => {
                    setActiveConstellation(key);
                    setMascotMessage(`Let's explore ${constellation.name} quests!`);
                    setShowMascot(true);
                    setTimeout(() => setShowMascot(false), 3000);
                  }}
                  className={`flex-shrink-0 p-4 rounded-2xl transition-all duration-300 min-w-0 hover:scale-105 group ${
                    isActive 
                      ? 'bg-gradient-to-br shadow-xl transform scale-105' 
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                  style={{
                    backgroundColor: isActive ? `${constellation.color}30` : undefined,
                    borderColor: isActive ? constellation.color : 'transparent',
                    border: '2px solid',
                    boxShadow: isActive ? `0 0 30px ${constellation.color}40` : undefined
                  }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <constellation.icon 
                      className={`w-7 h-7 group-hover:scale-110 transition-transform ${isActive ? 'animate-pulse' : ''}`}
                      style={{ color: isActive ? constellation.color : 'white' }}
                    />
                    <div className="text-xs font-bold whitespace-nowrap">{constellation.name}</div>
                    <div className="text-xs text-gray-300">{progress.completed}/{progress.total}</div>
                    
                    {/* Progress indicator */}
                    <div className="w-8 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full transition-all duration-500"
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Active Content Header */}
      {activeTab === 'quests' ? (
        <div className="bg-black/20 p-4">
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center animate-pulse"
              style={{ backgroundColor: `${activeConst.color}30`, border: `3px solid ${activeConst.color}` }}
            >
              <activeConst.icon className="w-8 h-8" style={{ color: activeConst.color }} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{activeConst.name} Quests</h2>
              <p className="text-sm text-gray-300">{activeConst.description}</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 p-4 rounded-2xl font-medium transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Custom Quest
          </button>
        </div>
      ) : (
        <div className="bg-black/20 p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-2xl flex items-center justify-center">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">Cosmic Shop</h2>
              <p className="text-sm text-gray-300">Spend your hard-earned coins</p>
            </div>
          </div>
          
          {/* Shop Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['theme', 'booster', 'power', 'cosmetic', 'utility'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedShopCategory(category)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl transition-all duration-300 capitalize ${
                  selectedShopCategory === category 
                    ? 'bg-yellow-600 text-white shadow-lg' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {category}s
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Area - Quests or Shop */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'quests' ? (
          // Quest List - Include custom quests
          [...activeConst.quests, ...(player.customQuests[activeConstellation] || [])].map((quest, index) => {
            const isCompleted = player.completedQuests.includes(quest.id);
            const hasComment = player.comments[quest.id];
            const streak = player.streaks[quest.id] || 0;

            return (
              <div 
                key={quest.id} 
                className={`relative p-5 rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                  isCompleted 
                    ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/50 shadow-lg shadow-green-500/20' 
                    : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                }`}
              >
                {/* Completion glow effect */}
                {isCompleted && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-2xl animate-pulse" />
                )}
                
                <div className="flex items-start gap-4 relative z-10">
                  {/* Enhanced Checkbox */}
                  <button
                    onClick={() => toggleQuest(quest.id)}
                    className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all hover:scale-110 flex-shrink-0 relative ${
                      isCompleted 
                        ? 'bg-green-500 border-green-500 shadow-lg shadow-green-500/30' 
                        : 'border-gray-400 hover:border-white hover:bg-white/10'
                    }`}
                  >
                    {isCompleted && (
                      <>
                        <CheckCircle className="w-6 h-6 text-white" />
                        <div className="absolute inset-0 bg-green-400 rounded-xl animate-ping opacity-30" />
                      </>
                    )}
                  </button>
                  
                  {/* Quest Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                      <quest.icon className={`w-6 h-6 flex-shrink-0 transition-colors ${isCompleted ? 'text-green-400' : 'text-gray-400'}`} />
                      <span className={`font-medium text-lg ${isCompleted ? 'line-through text-gray-400' : 'text-white'}`}>
                        {quest.name}
                      </span>
                      {streak > 0 && (
                        <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 rounded-full shadow-lg animate-pulse">
                          <Flame className="w-4 h-4 text-white" />
                          <span className="text-sm font-bold text-white">{streak}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-cyan-400" />
                        <span className="text-cyan-400 text-sm font-bold">+{quest.exp} XP</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Coins className="w-5 h-5 text-yellow-400" />
                        <span className="text-yellow-400 text-sm font-bold">+{Math.floor(quest.exp / 2)}</span>
                      </div>
                      
                      {hasComment && (
                        <div className="flex items-center gap-1 text-purple-400">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-xs">Reflection</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Enhanced Comment Display */}
                    {hasComment && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-black/40 to-black/30 rounded-xl border border-white/10 backdrop-blur-sm">
                        <div className="text-sm text-gray-300 italic leading-relaxed">
                          "{player.comments[quest.id]}"
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          // Shop Items
          shopItems.filter(item => item.category === selectedShopCategory).map((item) => {
            const isOwned = player.inventory.includes(item.id);
            const canAfford = player.coins >= item.price;
            
            return (
              <div 
                key={item.id}
                className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
                  isOwned 
                    ? 'bg-green-500/20 border-green-500/50' 
                    : 'bg-white/5 border-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    item.category === 'theme' ? 'bg-gradient-to-br' : 'bg-purple-600/30'
                  }`}
                  style={item.category === 'theme' ? { background: item.preview } : {}}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-white">{item.name}</h3>
                      {isOwned && <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">Owned</div>}
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Coins className="w-5 h-5 text-yellow-400" />
                        <span className="text-yellow-400 font-bold">{item.price}</span>
                        {item.uses && (
                          <span className="text-gray-400 text-sm">• {item.uses} uses</span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => purchaseItem(item)}
                        disabled={isOwned || !canAfford}
                        className={`px-6 py-2 rounded-xl font-medium transition-all ${
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
          })
        )}
      </div>

      {/* Enhanced Bottom Stats Bar */}
      <div className="bg-black/30 backdrop-blur-md border-t border-white/20 p-4">
        <div className="grid grid-cols-2 gap-6 text-center">
          <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
            <div className="text-2xl font-bold text-green-400">
              {player.completedQuests.length}
            </div>
            <div className="text-xs text-gray-400 mt-1">Total Completed</div>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
            <div className="text-2xl font-bold text-orange-400">
              {Object.keys(player.streaks).length}
            </div>
            <div className="text-xs text-gray-400 mt-1">Active Streaks</div>
          </div>
        </div>
      </div>

      {/* Enhanced Comment Modal */}
      {showCommentModal && selectedQuest && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 w-full max-w-md border border-white/20 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-2xl">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-400 mb-2">Quest Reflection</h3>
              <p className="text-gray-300 font-medium">"{selectedQuest.name}"</p>
              
              {/* XP preview display */}
              <div className="mt-4 flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 bg-cyan-500/20 px-4 py-2 rounded-xl border border-cyan-400/30">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <span className="text-cyan-400 font-bold">+{selectedQuest.expGain || selectedQuest.exp} XP</span>
                  {selectedQuest.expGain && selectedQuest.expGain > selectedQuest.exp && (
                    <span className="text-xs text-cyan-300">(2X!)</span>
                  )}
                </div>
                <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-xl border border-yellow-400/30">
                  <Coins className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-bold">+{selectedQuest.coinGain || Math.floor(selectedQuest.exp / 2)}</span>
                  {selectedQuest.coinGain && selectedQuest.coinGain > Math.floor(selectedQuest.exp / 2) && (
                    <span className="text-xs text-yellow-300">(1.5X!)</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3 text-gray-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Take a moment to reflect on this accomplishment
              </label>
              <textarea
                placeholder="How did it feel? What did you learn? What went well?"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full p-4 bg-black/40 border border-white/20 rounded-2xl text-white placeholder-gray-400 h-28 resize-none focus:border-purple-400 focus:outline-none transition-all focus:shadow-lg focus:shadow-purple-500/20"
                rows="3"
              />
              <div className="text-xs text-gray-400 mt-2">
                Taking time to reflect helps build lasting habits and motivation
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={skipReflection}
                className="flex-1 bg-gray-700 hover:bg-gray-600 py-4 rounded-2xl font-medium transition-all hover:scale-105"
              >
                Skip for now
              </button>
              <button
                onClick={saveComment}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-4 rounded-2xl font-medium transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Save & Celebrate!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Add Quest Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 w-full max-w-md border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Plus className="w-6 h-6 text-purple-400" />
                Create Custom Quest
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-white" />
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3 text-gray-200">
                What would you like to accomplish?
              </label>
              <input
                type="text"
                placeholder="e.g., Practice guitar for 20 minutes"
                value={newQuestText}
                onChange={(e) => setNewQuestText(e.target.value)}
                className="w-full p-4 bg-black/40 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-all focus:shadow-lg focus:shadow-purple-500/20"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 py-4 rounded-2xl transition-all hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={addCustomQuest}
                disabled={!newQuestText.trim()}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed py-4 rounded-2xl transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <Star className="w-4 h-4" />
                Add Quest
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Success Notification */}
      {notification && (
        <div className={`fixed top-24 left-4 right-4 z-50 p-4 rounded-2xl backdrop-blur-md shadow-2xl transition-all duration-500 ${
          notification.type === 'success' 
            ? 'bg-green-500/90 border-2 border-green-400' 
            : 'bg-red-500/90 border-2 border-red-400'
        }`}>
          <div className="font-medium text-white text-center flex items-center justify-center gap-2">
            {notification.type === 'success' ? (
              <Trophy className="w-5 h-5 text-yellow-300" />
            ) : (
              <X className="w-5 h-5" />
            )}
            {notification.message}
          </div>
        </div>
      )}

      {/* Celebration Animation Overlay */}
      {showCelebration && celebrationQuest && (
        <CelebrationAnimation quest={celebrationQuest} />
      )}

      {/* All Enhanced Keyframes and Styles */}
      <style jsx>{`
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
        
        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
          50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8), 0 0 60px rgba(59, 130, 246, 0.6); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes card-float {
          from { opacity: 0; transform: translateY(40px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes slide-up-bounce {
          from { opacity: 0; transform: translateY(50px); }
          60% { transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes number-pop {
          0% { transform: scale(0.8); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        @keyframes draw {
          from { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
          to { stroke-dasharray: 1000; stroke-dashoffset: 0; }
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
        
        @keyframes shooting-star {
          0% { 
            transform: translateX(-100px) translateY(0px) rotate(-45deg);
            opacity: 0;
          }
          10% { 
            opacity: 1;
          }
          90% { 
            opacity: 1;
          }
          100% { 
            transform: translateX(100vw) translateY(-100px) rotate(-45deg);
            opacity: 0;
          }
        }
        
        @keyframes trail {
          0% { 
            transform: translateX(-100%);
            opacity: 0;
          }
          50% { 
            opacity: 1;
          }
          100% { 
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 0.8;
            transform: scale(1.2);
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
        
        @keyframes sparkle-trail {
          0%, 100% { 
            opacity: 0;
            transform: scale(0.5) rotate(0deg);
          }
          50% { 
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
          }
        }
        
        @keyframes typewriter {
          0% { 
            max-width: 0;
            overflow: hidden;
          }
          100% { 
            max-width: 100%;
          }
        }
        
        @keyframes title-wave {
          0% { 
            background-position: 0% 50%;
            transform: translateY(0);
          }
          25% { 
            transform: translateY(-2px);
          }
          50% { 
            background-position: 100% 50%;
            transform: translateY(0);
          }
          75% { 
            transform: translateY(2px);
          }
          100% { 
            background-position: 0% 50%;
            transform: translateY(0);
          }
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
        
        .animate-text-shimmer {
          background-size: 200% auto;
          animation: text-shimmer 3s linear infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
        
        .animate-card-float {
          animation: card-float 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-up-bounce {
          animation: slide-up-bounce 1s ease-out forwards;
          opacity: 0;
        }
        
        .animate-number-pop {
          animation: number-pop 0.6s ease-out;
        }
        
        .animate-counter {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-stagger-in {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-draw {
          animation: draw 3s ease-in-out infinite;
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
        
        .animate-shooting-star {
          animation: shooting-star 3s linear infinite;
        }
        
        .animate-trail {
          animation: trail 1s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-mascot-entrance {
          animation: mascot-entrance 2s ease-out;
        }
        
        .animate-bubble-pop {
          animation: bubble-pop 0.6s ease-out;
        }
        
        .animate-sparkle-trail {
          animation: sparkle-trail 2s ease-in-out infinite;
        }
        
        .animate-typewriter {
          animation: typewriter 1.5s ease-out;
        }
        
        .animate-title-wave {
          background-size: 200% 200%;
          animation: title-wave 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ConstellationToDoApp;