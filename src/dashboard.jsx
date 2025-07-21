import React, { useState } from 'react';
import Logo from './assets/icons/logo.svg';
import ProfileImage from './assets/icons/profileImage.svg';
import Logout from './assets/icons/Logout.svg';
import {
  User, Mail, Search, Plus, Bell, TrendingUp, TrendingDown,
  Heart, ThumbsUp, Flame, Users, Settings, Menu, X, Facebook, Instagram, Linkedin
} from 'lucide-react';
import BarChart from './assets/icons/barchart.svg';
import DollarSign from './assets/icons/dollarcoin.svg';
import Circlelayer from './assets/icons/circlelayer.svg';
import AddUser from './assets/icons/addAccount.svg';
import ImpressIcon from './assets/icons/impressionIcon.svg';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-[#F6F6F6] font-Lexend">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className={`
        fixed lg:static inset-y-0 left-0 z-30 bg-white shadow-sm p-4 
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 p-2 rounded-lg bg-gray-100 lg:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-full lg:w-64 bg-white shadow-sm h-full p-4 lg:p-6 flex-shrink-0 flex flex-col justify-between">
            <nav className="space-y-2">
                <div className="flex items-center justify-center mb-8">
                    <img src={Logo} alt="Logo" className="w-[100px] h-[30px] lg:w-[120px] lg:h-[36px]" />
                </div>
                {[
                    { icon: User, text: 'My Portfolio', active: true },
                    { icon: Users, text: 'My Group' },
                    { icon: Mail, text: 'Messages' },
                    { icon: BarChart, text: 'Analytics', isSvg: true },
                    { icon: DollarSign, text: 'Pack', isSvg: true },
                    { icon: Settings, text: 'Settings' }
                    ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <a
                        key={idx}
                        href="#"
                        className={`flex items-center px-6 py-3 rounded-[16px] text-sm transition-all shadow-[#00000012] ${
                            item.active ? 'bg-gray-50 text-orange-500 font-medium' : 'text-[#818187] hover:text-orange-500 hover:bg-gray-50'
                        }`}
                        >
                        <span className="w-[18px] h-[18px] mr-3 flex items-center justify-center">
                            {item.isSvg ? (
                            <img src={Icon} alt={`${item.text} icon`} className="w-full h-full" />
                            ) : (
                            <Icon className="w-full h-full" />
                            )}
                        </span>
                        {item.text}
                        </a>
                    );
                })}

            </nav>
        
        
          <div className="flex flex-col items-center justify-center space-y-3 shadow-lg rounded-[16px] h-[148px] w-[202px]">
            <img src={ProfileImage} alt="ProfileImage" className="w-[60px] h-[60px] lg:w-[60px] lg:h-[60px] mt-[-40px]" />
            <div className="hidden sm:block text-center">
                <p className="text-[18px] font-Lexend text-[#3B3B45] font-[700]">Theresa milly</p>
                <p className="text-xs text-[#818187]">Influencer</p>
            </div>
            <button className="flex items-center text-sm text-orange-500 hover:text-orange-600 bg-[#FF860029] rounded-[12px] py-[12px] px-[32px]">
                <img src={Logout} alt="Logout" className="w-[18px] h-[18px] lg:w-[18px] lg:h-[18px] mr-2" />
                <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

          
        </div>
      </div>

      <div className="flex-1 overflow-y-auto font-Lexend">
        <div className="bg-transparent border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg bg-gray-100 mr-4 lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-xl lg:text-[24px] font-[700] text-[#3B3B45]">My Portfolio</h1>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#000F29] w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-3 rounded-[16px] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-32 lg:w-[422px]"
                />
              </div>
              <button className="bg-white text-[#000F29] p-2 rounded-[50%] hover:bg-orange-600 w-[48px] h-[48px] flex items-center justify-center">
                <Plus className="w-[14px] h-[14px] lg:w-[20px] lg:h-[20px]" />
              </button>
              <button className="relative bg-white p-2 rounded-full hover:bg-gray-200 w-[48px] h-[48px] flex items-center justify-center">
                <Bell className="w-4 h-4 lg:w-5 lg:h-5 text-[#3B3B45]" />
                <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2 lg:w-3 lg:h-3 flex items-center justify-center"></span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 lg:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6">
            <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[25px] font-[700] text-[#3B3B45] mb-1">51</p>
                  <p className="text-[#A3A3A6] text-[12px]">Total Channels</p>
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#E0FAF5] rounded-[50%] flex items-center justify-center">
                    <img src={Circlelayer} alt="Circlelayer" className="w-[20px] h-[20px]" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[25px] font-[700] text-[#3B3B45] mb-1">125</p>
                  <p className="text-[#A3A3A6] text-[12px]">New Members</p>
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#EFF2FE] rounded-[50%] flex items-center justify-center">
                  <img src={AddUser} alt="AddUser" className="w-[20px] h-[20px]" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[25px] font-[700] text-[#3B3B45] mb-1">789</p>
                  <p className="text-[#A3A3A6] text-[12px]">All Impressions</p>
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#FFF0E0] rounded-[50%] flex items-center justify-center">
                  <img src={ImpressIcon} alt="ImpressIcon" className="w-[20px] h-[20px]" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-6">Overview</h2>
                <div className="flex flex-wrap gap-1 mb-6 overflow-x-auto">
                  <button className="bg-orange-500 text-white px-3 lg:px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap">Robbin Hood</button>
                  <button className="text-gray-500 px-3 lg:px-4 py-2 hover:bg-gray-50 rounded-lg text-sm whitespace-nowrap">Amreitrade</button>
                  <button className="text-gray-500 px-3 lg:px-4 py-2 hover:bg-gray-50 rounded-lg text-sm whitespace-nowrap">Fidelity</button>
                  <button className="text-gray-500 px-3 lg:px-4 py-2 hover:bg-gray-50 rounded-lg text-sm whitespace-nowrap">Charles</button>
                </div>
                
                {/* Bar Chart */}
                <div className="h-48 lg:h-64 relative">
                  <div className="absolute inset-0 flex items-end justify-between px-2 lg:px-4">
                    {[400, 350, 500, 450, 300, 650, 850, 600, 400, 700, 300, 450].map((height, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className={`w-4 lg:w-8 ${index === 5 ? 'bg-orange-500' : 'bg-gray-200'} rounded-t`}
                          style={{ height: `${(height / 1000) * 100}%` }}
                        ></div>
                        <span className="text-[10px] lg:text-xs text-gray-400 mt-2">
                          {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] lg:text-xs text-gray-400 pr-2">
                    <span>1000</span>
                    <span>800</span>
                    <span>600</span>
                    <span>400</span>
                    <span>200</span>
                    <span>0</span>
                  </div>
                </div>
              </div>

              {/* Trending Posts */}
              <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-6">Trending Posts</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-2 text-sm lg:text-base">8 Upcoming Influencer Marketing Trends and Benefits</h3>
                    <p className="text-xs lg:text-sm text-gray-500 mb-3">Marketing is evolving. It's changing from a one-way street to a two-way conversa...</p>
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center text-xs lg:text-sm text-gray-500">
                        <Heart className="w-3 h-3 lg:w-4 lg:h-4 mr-1 text-red-500" />
                        260
                      </span>
                      <span className="flex items-center text-xs lg:text-sm text-gray-500">
                        <ThumbsUp className="w-3 h-3 lg:w-4 lg:h-4 mr-1 text-orange-500" />
                        234
                      </span>
                      <span className="flex items-center text-xs lg:text-sm text-gray-500">
                        <Flame className="w-3 h-3 lg:w-4 lg:h-4 mr-1 text-red-500" />
                        123
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-800 mb-2 text-sm lg:text-base">How Influencer Marketing Affects Consumer Buying Behavior</h3>
                    <p className="text-xs lg:text-sm text-gray-500 mb-3">As influencer marketing continues to grow, consumers have been turning to their...</p>
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center text-xs lg:text-sm text-gray-500">
                        <Heart className="w-3 h-3 lg:w-4 lg:h-4 mr-1 text-red-500" />
                        260
                      </span>
                      <span className="flex items-center text-xs lg:text-sm text-gray-500">
                        <ThumbsUp className="w-3 h-3 lg:w-4 lg:h-4 mr-1 text-orange-500" />
                        234
                      </span>
                      <span className="flex items-center text-xs lg:text-sm text-gray-500">
                        <Flame className="w-3 h-3 lg:w-4 lg:h-4 mr-1 text-red-500" />
                        123
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Watchlist */}
              <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg lg:text-xl font-bold text-gray-800">Watchlist</h2>
                  <button className="text-orange-500 text-xs lg:text-sm font-medium">VIEW ALL</button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="font-bold text-gray-800 mr-2 text-sm lg:text-base">AAPL</span>
                        <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-green-500" />
                      </div>
                      <p className="text-lg lg:text-xl font-bold text-gray-800">$142.90</p>
                      <p className="text-xs lg:text-sm text-green-500">+0.47%</p>
                    </div>
                    <div className="w-12 lg:w-16 h-6 lg:h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded relative overflow-hidden">
                      <svg className="w-full h-full" viewBox="0 0 64 32">
                        <path d="M0,20 Q16,10 32,15 T64,12" stroke="white" strokeWidth="2" fill="none"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="font-bold text-gray-800 mr-2 text-sm lg:text-base">BPL</span>
                        <TrendingDown className="w-3 h-3 lg:w-4 lg:h-4 text-red-500" />
                      </div>
                      <p className="text-lg lg:text-xl font-bold text-gray-800">$142.90</p>
                      <p className="text-xs lg:text-sm text-red-500">-0.78%</p>
                    </div>
                    <div className="w-12 lg:w-16 h-6 lg:h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded relative overflow-hidden">
                      <svg className="w-full h-full" viewBox="0 0 64 32">
                        <path d="M0,12 Q16,8 32,18 T64,20" stroke="white" strokeWidth="2" fill="none"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Revenue */}
              <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-6">Revenue</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl lg:text-2xl font-bold text-gray-800">$4,000</p>
                      <p className="text-xs lg:text-sm text-gray-500">Recently Added Pages</p>
                    </div>
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Facebook className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl lg:text-2xl font-bold text-gray-800">$2,120</p>
                      <p className="text-xs lg:text-sm text-gray-500">Video Monetization</p>
                    </div>
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-pink-500 rounded-lg flex items-center justify-center">
                      <Instagram className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl lg:text-2xl font-bold text-gray-800">$1,752</p>
                      <p className="text-xs lg:text-sm text-gray-500">Community Buildup</p>
                    </div>
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Linkedin className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Trending News */}
              <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-6">Trending News</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-200 rounded-lg flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-gray-800 text-xs lg:text-sm">Russia & Ukraine War</p>
                      <p className="text-[10px] lg:text-xs text-gray-500">Marketing is evolving. It's chang...</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xs lg:text-sm">🐦</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-xs lg:text-sm">Elon Musk bought Twitter</p>
                      <p className="text-[10px] lg:text-xs text-gray-500">Twitter is the most useful social pl...</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xs lg:text-sm">⛽</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-xs lg:text-sm">Fuel Crisis Everywhere</p>
                      <p className="text-[10px] lg:text-xs text-gray-500">Due to covid situation in 2020 the...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Potential Members */}
          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
            <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-6">Potential Members</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
              {[
                { name: 'Wanda Parker', handle: '@ashking1234', growth: '10.3%' },
                { name: 'Terry Brown', handle: '@ashking1234', growth: '9.8%' },
                { name: 'Lucas Holmes', handle: '@ashking1234', growth: '6.5%' },
                { name: 'Janice Miller', handle: '@ashking1234', growth: '8.6%' },
                { name: 'Terry Brown', handle: '@ashking1234', growth: '9.8%' }
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-300 rounded-full mx-auto mb-3"></div>
                  <p className="font-medium text-gray-800 text-xs lg:text-sm">{member.name}</p>
                  <p className="text-[10px] lg:text-xs text-gray-500 mb-1">{member.handle}</p>
                  <div className="flex items-center justify-center">
                    <TrendingUp className="w-2 h-2 lg:w-3 lg:h-3 text-green-500 mr-1" />
                    <span className="text-[10px] lg:text-xs text-green-500 font-medium">{member.growth}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;