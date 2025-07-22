import React, { useState } from 'react';
import Logo from './assets/icons/logo.svg';
import ProfileImage from './assets/icons/profileImage.svg';
import Logout from './assets/icons/Logout.svg';
import {
  User, Mail, Search, Plus, Bell, TrendingUp, MessageCircle, Share2,
  Heart, Users, Settings, Menu, X, Facebook, Instagram, Linkedin
} from 'lucide-react';
import BarChart from './assets/icons/barchart.svg';
import DollarSign from './assets/icons/dollarcoin.svg';
import Circlelayer from './assets/icons/circlelayer.svg';
import AddUser from './assets/icons/addAccount.svg';
import ImpressIcon from './assets/icons/impressionIcon.svg';
import Arrowup from './assets/icons/uparrow.svg';
import Arrowdown from './assets/icons/downarrow.svg';
import AaplChart from './assets/icons/aapl.png';
import RussiaImg from './assets/icons/russiaImg.png';
import ElonMuskImg from './assets/icons/elonMuskImg.png';
import FuelcrisesImg from './assets/icons/fuelcrisesImg.png';
import MemberImg from './assets/icons/wanda.png';
import TerryImg from './assets/icons/terry.png';
import LucasImg from './assets/icons/lucas.png';
import JaniceImg from './assets/icons/janice.png';
import TemmyImg from './assets/icons/temmy.png';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const barChartData = [
    { month: 'JAN', value1: 750, value2: 620 },
    { month: 'FEB', value1: 500, value2: 450 },
    { month: 'MAR', value1: 600, value2: 580 },
    { month: 'APR', value1: 580, value2: 620 },
    { month: 'MAY', value1: 640, value2: 590 },
    { month: 'JUN', value1: 900, value2: 720, highlight: true },
    { month: 'JUL', value1: 760, value2: 680 },
    { month: 'AUG', value1: 680, value2: 640 },
    { month: 'SEP', value1: 540, value2: 580 },
    { month: 'OCT', value1: 760, value2: 700 },
    { month: 'NOV', value1: 450, value2: 480 },
    { month: 'DEC', value1: 670, value2: 620 },
  ];

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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6">
                <div className="bg-white p-4 lg:p-5 rounded-[12px] shadow-sm border border-gray-100">
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
                
                <div className="bg-white p-4 lg:p-5 rounded-[12px] shadow-sm border border-gray-100">
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
                
                <div className="bg-white p-4 lg:p-5 rounded-[12px] shadow-sm border border-gray-100 sm:col-span-2 lg:col-span-1">
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
              <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                  <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4 lg:mb-0">Overview</h2>
                  <div className="flex flex-wrap gap-2">
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-xs font-medium">Robbin Hood</button>
                    <button className="bg-gray-100 text-gray-600 px-4 py-2 hover:bg-gray-200 rounded-full text-xs font-medium">Amreitrade</button>
                    <button className="bg-gray-100 text-gray-600 px-4 py-2 hover:bg-gray-200 rounded-full text-xs font-medium">Fidelity</button>
                    <button className="bg-gray-100 text-gray-600 px-4 py-2 hover:bg-gray-200 rounded-full text-xs font-medium">Charles</button>
                  </div>
                </div>
                
                
                <div className="h-64 relative bg-white rounded-lg p-4">
                  
                  <div className="absolute left-0 top-4 bottom-12 flex flex-col justify-between text-xs text-gray-400 w-10">
                    {[1000, 800, 600, 400, 200, 0].map((label) => (
                      <span key={label} className="text-right">{label}</span>
                    ))}
                  </div>

                  {/* Chart area */}
                  <div className="ml-12 mr-4 h-full relative">
                    {/* Grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between">
                      {[1000, 800, 600, 400, 200, 0].map((_, index) => (
                        <div key={index} className="border-t border-gray-200 w-full"></div>
                      ))}
                    </div>

                    <div className="absolute inset-0 flex items-end justify-between pb-8">
                      {barChartData.map((item, index) => (
                        <div key={index} className="flex flex-col items-center flex-1 max-w-16">
                          <div className="flex items-end justify-center gap-1 mb-2">
                           
                            <div
                              className={`w-3 rounded-t transition-all duration-300 ${
                                item.highlight ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-300 hover:bg-gray-400'
                              }`}
                              style={{ 
                                height: `${Math.max((item.value1 / 1000) * 180, 4)}px`,
                                minHeight: '4px'
                              }}
                              title={`${item.month} Series 1: ${item.value1}`}
                            ></div>
                            
                            <div
                              className={`w-3 rounded-t transition-all duration-300 ${
                                item.highlight ? 'bg-orange-400 hover:bg-orange-500' : 'bg-gray-400 hover:bg-gray-500'
                              }`}
                              style={{ 
                                height: `${Math.max((item.value2 / 1000) * 180, 4)}px`,
                                minHeight: '4px'
                              }}
                              title={`${item.month} Series 2: ${item.value2}`}
                            ></div>
                          </div>
                          
                          <span className="text-xs text-gray-500 transform origin-center whitespace-nowrap">
                            {item.month}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-[20px] font-[700] text-[#3B3B45] mb-6">Trending Posts</h2>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-[600] text-[#3B3B45] mb-2 text-[18px]">8 Upcoming Influencer Marketing Trends and Benefits</h3>
                    <p className="text-[14px] text-[#818187] mb-3">Marketing is evolving. It's changing from a one-way street to a two-way conversa...</p>
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center text-xs lg:text-sm text-gray-500">
                        <Heart className="w-3 h-3 lg:w-4 lg:h-4 mr-1 text-red-500" />
                        260
                      </span>
                      <span className="flex items-center text-xs lg:text-sm text-gray-500">
                        <MessageCircle className="w-3 h-3 lg:w-4 lg:h-4 mr-1 text-orange-500" />
                        234
                      </span>
                      <span className="flex items-center text-xs lg:text-sm text-gray-500">
                        <Share2 className="w-3 h-3 lg:w-4 lg:h-4 mr-1 text-red-500" />
                        123
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-[600] text-[#3B3B45] mb-2 text-[18px]">How Influencer Marketing Affects Consumer Buying Behavior</h3>
                    <p className="text-[14px] text-[#818187] mb-3">As influencer marketing continues to grow, consumers have been turning to their...</p>
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center text-xs lg:text-sm text-gray-500">
                        <Heart className="w-3 h-3 lg:w-4 lg:h-4 mr-1 text-red-500" />
                        260
                      </span>
                      <span className="flex items-center text-xs lg:text-sm text-gray-500">
                        <MessageCircle className="w-3 h-3 lg:w-4 lg:h-4 mr-1 text-orange-500" />
                        234
                      </span>
                      <span className="flex items-center text-xs lg:text-sm text-gray-500">
                        <Share2 className="w-3 h-3 lg:w-4 lg:h-4 mr-1 text-red-500" />
                        123
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
                <h2 className="text-[20px] font-[700] text-gray-800 mb-6">Potential Members</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                  {[
                    { name: 'Wanda Parker', handle: '@ashking1234', growth: '10.3%', image: MemberImg },
                    { name: 'Terry Brown', handle: '@ashking1234', growth: '9.8%', image: TerryImg },
                    { name: 'Lucas Holmes', handle: '@ashking1234', growth: '6.5%', image: LucasImg },
                    { name: 'Janice Miller', handle: '@ashking1234', growth: '8.6%', image: JaniceImg },
                    { name: 'Temmy Brown', handle: '@ashking12345', growth: '7.8%', image: TemmyImg }
                  ].map((member, index) => (
                    <div key={index} className="text-center">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-10 h-10 lg:w-12 lg:h-12 rounded-full mx-auto mb-3 object-cover"
                      />
                      <p className="font-[600] text-[#3B3B45] text-[18px]">{member.name}</p>
                      <p className="font-[400] text-[11px] text-[#818187] mb-1">{member.handle}</p>
                      <div className="flex items-center justify-center">
                        <TrendingUp className="w-[16px] h-[16px] text-green-500 mr-1" />
                        <span className="text-[16px] text-[#3B3B45] font-[700]">{member.growth}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            
            <div className="space-y-6">
              {/* Watchlist */}
              <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[20px] font-[700] text-[#3B3B45]">Watchlist</h2>
                  <button className="text-[#FF8600] text-[12px] font-[600]">VIEW ALL</button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-[#F6F6F6] px-[16px] py-[12px] rounded-[12px] flex items-center justify-between">
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="font-bold text-gray-800 mr-2 text-sm lg:text-base">AAPL</span>
                        <img src={Arrowup} alt="Arrowup" className="w-[24px] h-[24px]" />
                      </div>
                      <p className="text-[15px] font-[500] text-[#A3A3A6]">$142.90</p>
                      <p className="text-[12px] font-[500] text-[#00A441]">+0.47%</p>
                    </div>
                    <div className="relative overflow-hidden">
                      <img src={AaplChart} alt="AaplChart" className="w-[100px] h-[40px] lg:w-[154px] lg:h-[59px]" />
                    </div>
                  </div>
                  
                  <div className="bg-[#F6F6F6] px-[16px] py-[12px] rounded-[12px] flex items-center justify-between">
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="font-bold text-gray-800 mr-2 text-sm lg:text-base">BPL</span>
                        <img src={Arrowdown} alt="Arrowdown" className="w-[24px] h-[24px]" />
                      </div>
                      <p className="text-[15px] font-[500] text-[#A3A3A6]">$142.90</p>
                      <p className="text-[12px] font-[500] text-[#FF5252]">-0.78%</p>
                    </div>
                    <div className="relative overflow-hidden">
                      <img src={AaplChart} alt="AaplChart" className="w-[100px] h-[40px] lg:w-[154px] lg:h-[59px]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Revenue */}
              <div className="bg-white p-4 lg:p-6 rounded-[16px] shadow-sm border border-gray-100">
                <h2 className="text-[20px] font-[700] text-[#3B3B45] mb-6">Revenue</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-[16px] py-[8px] border border-[#F1F1F1]">
                    <div>
                      <p className="text-[18px] font-[600] text-[#3B3B45]">$4,000</p>
                      <p className="text-[12px] font-[400] text-[#A3A3A6]">Recently Added Pages</p>
                    </div>
                    <div className="w-[48px] h-[48px] bg-[#EDF4FE] rounded-[50%] flex items-center justify-center">
                      <Facebook className="w-3 h-3 lg:w-4 lg:h-4 text-[#1773EA]" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between px-[16px] py-[8px] border border-[#F1F1F1]">
                    <div>
                      <p className="text-[18px] font-[600] text-[#3B3B45]">$2,120</p>
                      <p className="text-[12px] font-[400] text-[#A3A3A6]">Video Monetization</p>
                    </div>
                    <div className="w-[48px] h-[48px] bg-[#FEEFF1] rounded-[50%] flex items-center justify-center">
                      <Instagram className="w-3 h-3 lg:w-4 lg:h-4 text-[#EB3348]" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between px-[16px] py-[8px] border border-[#F1F1F1]">
                    <div>
                      <p className="text-[18px] font-[600] text-[#3B3B45]">$1,752</p>
                      <p className="text-[12px] font-[400] text-[#A3A3A6]">Community Buildup</p>
                    </div>
                    <div className="w-[48px] h-[48px] bg-[#EEF3F9] rounded-[50%] flex items-center justify-center">
                      <Linkedin className="w-3 h-3 lg:w-4 lg:h-4 text-[#2764AC]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Trending News */}
              <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-[20px] font-[700] text-[#3B3B45] mb-6">Trending News</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <img src={RussiaImg} alt="RussiaImg" className="w-[48px] h-[48px]" />
                    <div>
                      <p className="font-[600] text-[#3B3B45] text-[14px]">Russia & Ukraine War</p>
                      <p className="font-[600] text-[12px] text-[#818187]">Marketing is evolving. It's chang...</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <img src={ElonMuskImg} alt="ElonMuskImg" className="w-[48px] h-[48px]" />
                    <div>
                      <p className="font-[600] text-[#3B3B45] text-[14px]">Elon Musk bought Twitter</p>
                      <p className="font-[600] text-[12px] text-[#818187]">Twitter is the most useful social pl...</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <img src={FuelcrisesImg} alt="FuelcrisesImg" className="w-[48px] h-[48px]" />
                    <div>
                      <p className="font-[600] text-[#3B3B45] text-[14px]">Fuel Crisis Everywhere</p>
                      <p className="font-[600] text-[12px] text-[#818187]">Due to covid situation in 2020 the...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;