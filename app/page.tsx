"use client"

import { useState } from "react"
import { Calendar, ChevronDown, HelpCircle, Home, Info, LayoutGrid, Menu, Settings, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Dashboard() {
  const [dateRange, setDateRange] = useState("Aug 01, 2024 - Aug 03, 2024")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#f7f7f7]">
  {/* Mobile Header */}
  <div className="md:hidden bg-white p-4 border-b border-[#ebebeb] flex justify-between items-center">
    <div className="flex items-center">
      <div className="w-8 h-8 rounded-md overflow-hidden flex items-center justify-center">
        <img
          src="https://res.cloudinary.com/dlyctssmy/image/upload/v1744185311/download_zjpdjo.jpg"
          alt="Logo"
          className="object-cover w-full h-full"
        />
      </div>
      <h1 className="ml-2 text-lg font-medium">Quick Commerce</h1>
    </div>
    <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
      {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </Button>
  </div>

    {/* Sidebar */}
<div
  className={`${
    sidebarOpen ? "fixed inset-0 z-50 bg-white" : "hidden"
  } md:relative md:flex md:w-[220px] bg-white border-r border-[#ebebeb] flex-col md:flex`}
>
  <div className="p-4 border-b border-[#ebebeb] flex items-center">
    <div className="w-8 h-8 rounded-md overflow-hidden flex items-center justify-center">
      <img
        src="https://res.cloudinary.com/dlyctssmy/image/upload/v1744185311/download_zjpdjo.jpg"
        alt="Logo"
        className="object-cover w-full h-full"
      />
    </div>
    <div className="ml-2 text-sm font-medium flex items-center">
      <span>Test_brand</span>
      <ChevronDown className="w-4 h-4 ml-2 text-[#8c9198]" />
    </div>
    {sidebarOpen && (
      <Button
        variant="ghost"
        size="icon"
        className="ml-auto md:hidden"
        onClick={() => setSidebarOpen(false)}
      >
        <X className="h-6 w-6" />
      </Button>
    )}
  </div>


        <div className="flex-1 overflow-auto">
          <div className="py-2">
            <NavItem
              icon={<Home className="w-4 h-4" />}
              label="Overview"
              onClick={() => isMobile && setSidebarOpen(false)}
            />
            <NavItem
              icon={<LayoutGrid className="w-4 h-4" />}
              label="Channels"
              expanded={true}
              onClick={() => isMobile && setSidebarOpen(false)}
            >
              <SubNavItem label="Meta Ads" onClick={() => isMobile && setSidebarOpen(false)} />
              <SubNavItem label="Google Ads" onClick={() => isMobile && setSidebarOpen(false)} />
              <SubNavItem label="Quick Commerce" active={true} onClick={() => isMobile && setSidebarOpen(false)} />
            </NavItem>
            <NavItem
              icon={<LayoutGrid className="w-4 h-4" />}
              label="Creatives"
              onClick={() => isMobile && setSidebarOpen(false)}
            />
          </div>
        </div>

        <div className="mt-auto border-t border-[#ebebeb]">
          <NavItem
            icon={<HelpCircle className="w-4 h-4" />}
            label="Help"
            onClick={() => isMobile && setSidebarOpen(false)}
          />
          <NavItem
            icon={<Settings className="w-4 h-4" />}
            label="Settings"
            onClick={() => isMobile && setSidebarOpen(false)}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Desktop Header */}
        <div className="hidden md:flex bg-white p-4 border-b border-[#ebebeb] justify-between items-center">
          <h1 className="text-lg font-medium">Quick Commerce</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-sm border border-[#d9d9d9] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="#027056" />
                </svg>
              </div>
              <span className="text-sm">Compare</span>
            </div>
            <div className="flex items-center gap-2 border border-[#d9d9d9] rounded px-3 py-1.5">
              <Calendar className="w-4 h-4 text-[#8c9198]" />
              <span className="text-sm">{dateRange}</span>
              <ChevronDown className="w-4 h-4 text-[#8c9198]" />
            </div>
          </div>
        </div>

        {/* Mobile Date Range */}
        <div className="md:hidden p-4 flex justify-between items-center">
          <div className="flex items-center gap-2 border border-[#d9d9d9] rounded px-3 py-1.5">
            <Calendar className="w-4 h-4 text-[#8c9198]" />
            <span className="text-sm">{dateRange}</span>
            <ChevronDown className="w-4 h-4 text-[#8c9198]" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-sm border border-[#d9d9d9] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="#027056" />
              </svg>
            </div>
            <span className="text-sm">Compare</span>
          </div>
        </div>

        <div className="p-4">
          <Tabs defaultValue="blinkit">
            <TabsList className="mb-4 overflow-x-auto flex w-full">
  <TabsTrigger
    value="blinkit"
    className="bg-[#f8cb46]/20 text-[#f8cb46] data-[state=active]:bg-[#f8cb46]/20 data-[state=active]:text-[#f8cb46] rounded-md px-4 py-1.5 whitespace-nowrap"
  >
    <img
      src="https://res.cloudinary.com/dlyctssmy/image/upload/v1744217696/channels4_profile_for30k.jpg"
      alt="Blinkit Logo"
      className="w-4 h-4 mr-2 rounded-sm object-contain"
    />
    Blinkit
  </TabsTrigger>

  <TabsTrigger
    value="zepto"
    className="bg-[#6c4fed]/20 text-[#6c4fed] data-[state=active]:bg-[#6c4fed]/20 data-[state=active]:text-[#6c4fed] rounded-md px-4 py-1.5 ml-2 whitespace-nowrap"
  >
    <img
      src="https://res.cloudinary.com/dlyctssmy/image/upload/v1744217583/Zepto-Featured-Image-Option-2_s9uguw.png"
      alt="Zepto Logo"
      className="w-4 h-4 mr-2 rounded-sm object-contain"
    />
    Zepto
  </TabsTrigger>

  <TabsTrigger
    value="instamart"
    className="bg-[#e25d33]/20 text-[#e25d33] data-[state=active]:bg-[#e25d33]/20 data-[state=active]:text-[#e25d33] rounded-md px-4 py-1.5 ml-2 whitespace-nowrap"
  >
    <img
      src="https://res.cloudinary.com/dlyctssmy/image/upload/v1744217582/83c7_pmyoyc.avif"
      alt="Instamart Logo"
      className="w-4 h-4 mr-2 rounded-sm object-contain"
    />
    Instamart
  </TabsTrigger>
</TabsList>

            <TabsContent value="blinkit" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <MetricCard
                  title="Sales (MRP)"
                  value="125.49"
                  change="+2.4%"
                  subtext="vs 119.69 last month"
                  chartData={[20, 25, 30, 40, 35, 45, 50, 45, 60, 55, 65, 60, 70, 65, 75]}
                />
                <MetricCard
                  title="Total Quantity Sold"
                  value="125.49"
                  change="+2.4%"
                  subtext="vs 119.69 last month"
                  chartData={[20, 25, 30, 40, 35, 45, 50, 45, 60, 55, 65, 60, 70, 65, 75]}
                />
                <TopCitiesCard className="md:col-span-2 lg:col-span-1" />
              </div>

              <DataTable title="SKU level data" subtitle="Analytics for all your SKUs" />

              <div className="mt-6">
                <DataTable title="City level data" subtitle="Analytics for all your Cities" />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function NavItem({ icon, label, expanded = false, active = false, children, onClick }) {
  const [isExpanded, setIsExpanded] = useState(expanded)

  return (
    <div>
      <div
        className={`flex items-center px-4 py-2 text-sm cursor-pointer ${active ? "text-[#027056]" : "text-[#444444]"}`}
        onClick={() => {
          if (children) setIsExpanded(!isExpanded)
          if (onClick) onClick()
        }}
      >
        <div className="w-5 flex justify-center">{icon}</div>
        <span className="ml-2">{label}</span>
        {children && (
          <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${isExpanded ? "rotate-180" : ""}`} />
        )}
      </div>
      {isExpanded && children && <div className="ml-9 mt-1">{children}</div>}
    </div>
  )
}

function SubNavItem({ label, active = false, onClick }) {
  return (
    <div
      className={`flex items-center py-2 text-sm cursor-pointer ${
        active ? "bg-[#dfeae8] text-[#027056] rounded-md px-2" : "text-[#444444]"
      }`}
      onClick={onClick}
    >
      {label}
    </div>
  )
}

function MetricCard({ title, value, change, subtext, chartData }) {
  const isPositive = change.startsWith("+")

  return (
    <div className="bg-white rounded-lg p-4 border border-[#ebebeb]">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm text-[#515153]">{title}</h3>
        <div className="w-5 h-5 rounded-full border border-[#ebebeb] flex items-center justify-center">
          <Info className="w-3 h-3 text-[#8c9198]" />
        </div>
      </div>

      <div className="flex items-baseline">
        <h2 className="text-xl sm:text-2xl font-semibold">{value}</h2>
        <span className={`ml-2 text-xs font-medium ${isPositive ? "text-[#1d874f]" : "text-[#db3500]"}`}>{change}</span>
      </div>
      <p className="text-xs text-[#8c9198] mb-4">{subtext}</p>

      <div className="h-16 relative">
        <svg width="100%" height="100%" viewBox="0 0 300 60" preserveAspectRatio="none">
          <path
            d={`M0,${60 - chartData[0]} ${chartData.map((d, i) => `L${(i + 1) * (300 / chartData.length)},${60 - d}`).join(" ")}`}
            fill="none"
            stroke="#1d874f"
            strokeWidth="2"
          />
          <path
            d={`M0,60 ${chartData.map((d, i) => `L${(i + 1) * (300 / chartData.length)},${60 - d}`).join(" ")} L300,60 Z`}
            fill="url(#gradient)"
            opacity="0.2"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1d874f" />
              <stop offset="100%" stopColor="#1d874f" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-[#8c9198]">
          <div>09</div>
          <div>11</div>
          <div>13</div>
          <div>15</div>
        </div>
      </div>

      <div className="flex mt-2 text-xs">
        <div className="flex items-center mr-4">
          <div className="w-2 h-2 rounded-full bg-[#027056] mr-1"></div>
          <span>This Month</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-[#8c9198] mr-1"></div>
          <span>Last Month</span>
        </div>
      </div>
    </div>
  )
}

function TopCitiesCard({ className = "" }) {
  return (
    <div className={`bg-white rounded-lg p-4 border border-[#ebebeb] ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm text-[#515153]">Top Cities</h3>
        <div className="w-5 h-5 rounded-full border border-[#ebebeb] flex items-center justify-center">
          <Info className="w-3 h-3 text-[#8c9198]" />
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32">
          {/* Gauge chart */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
              stroke="#ebebeb"
              strokeWidth="10"
              fill="none"
            />
            <path
              d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
              stroke="url(#gaugeGradient)"
              strokeWidth="10"
              strokeDasharray="282.7"
              strokeDashoffset="70"
              fill="none"
            />
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6c4fed" />
                <stop offset="50%" stopColor="#f8cb46" />
                <stop offset="100%" stopColor="#e25d33" />
              </linearGradient>
            </defs>
            <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" className="text-xl font-bold">
              ₹68.2L
            </text>
            <text x="50" y="65" textAnchor="middle" dominantBaseline="middle" className="text-xs text-[#1d874f]">
              ↑ 2.2%
            </text>
          </svg>
        </div>
      </div>

      <div className="space-y-2">
        <CityItem name="New Delhi" value="₹26.5L" change="+1.2%" />
        <CityItem name="Mumbai" value="₹18.4L" change="-3.3%" negative />
        <CityItem name="West Bengal" value="₹12.3L" change="+2.3%" />
        <CityItem name="Others" value="₹24.3L" change="+1.09%" />
      </div>
    </div>
  )
}

function CityItem({ name, value, change, negative = false }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-1.5 h-1.5 rounded-full bg-[#8c9198] mr-2"></div>
        <span className="text-sm">{name}</span>
      </div>
      <div className="flex items-center">
        <span className="text-sm font-medium mr-2">{value}</span>
        <span className={`text-xs ${negative ? "text-[#db3500]" : "text-[#1d874f]"}`}>{change}</span>
      </div>
    </div>
  )
}

function DataTable({ title, subtitle }) {
  return (
    <div className="bg-white rounded-lg border border-[#ebebeb] overflow-hidden">
      <div className="p-4 border-b border-[#ebebeb]">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h3 className="text-base font-medium">{title}</h3>
            <p className="text-sm text-[#8c9198]">{subtitle}</p>
          </div>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <button className="border border-[#027056] text-[#027056] rounded px-3 py-1 text-sm font-medium flex items-center">
              Filter(1) <ChevronDown className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f7f7f7] border-b border-[#ebebeb]">
              <th className="py-3 px-2 sm:px-4 text-left text-sm font-medium text-[#515153] w-10">
                <Checkbox />
              </th>
              <th className="py-3 px-2 sm:px-4 text-left text-sm font-medium text-[#515153]">
                <div className="flex items-center">
                  SKU Name <ChevronDown className="w-4 h-4 ml-1" />
                </div>
              </th>
              <th className="py-3 px-2 sm:px-4 text-left text-sm font-medium text-[#515153]">
                <div className="flex items-center">
                  Sales <ChevronDown className="w-4 h-4 ml-1" />
                </div>
              </th>
              <th className="py-3 px-2 sm:px-4 text-left text-sm font-medium text-[#515153]">
                <div className="flex items-center">
                  Out of Stock <ChevronDown className="w-4 h-4 ml-1" />
                </div>
              </th>
              <th className="py-3 px-2 sm:px-4 text-left text-sm font-medium text-[#515153]">
                <div className="flex items-center">
                  Total Inventory <ChevronDown className="w-4 h-4 ml-1" />
                </div>
              </th>
              <th className="py-3 px-2 sm:px-4 text-left text-sm font-medium text-[#515153]">
                <div className="flex items-center">
                  Average Rank <ChevronDown className="w-4 h-4 ml-1" />
                </div>
              </th>
              <th className="py-3 px-2 sm:px-4 text-left text-sm font-medium text-[#515153]">
                <div className="flex items-center">
                  Est. Traffic <ChevronDown className="w-4 h-4 ml-1" />
                </div>
              </th>
              <th className="py-3 px-2 sm:px-4 text-left text-sm font-medium text-[#515153]">
                <div className="flex items-center">
                  Est. Impressions <ChevronDown className="w-4 h-4 ml-1" />
                </div>
              </th>
              <th className="py-3 px-2 sm:px-4 text-left text-sm font-medium text-[#515153]">
                <div className="flex items-center">
                  CTR <ChevronDown className="w-4 h-4 ml-1" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <TableRow
              checked={true}
              name="Protein Bar 100g"
              sales="₹93,112.12"
              outOfStock="1.68%"
              inventory="931.9"
              rank="3.2"
              traffic="12,303"
              impressions="25,005"
              ctr="1.1%"
            />
            <TableRow
              checked={true}
              name="Choco Bar 100g"
              sales="₹8,526.32"
              outOfStock="6.79%"
              inventory="679"
              rank="7"
              traffic="3005"
              impressions="4231"
              ctr="1.2%"
              changes={{
                sales: "+2.4%",
                outOfStock: "+2.4%",
                inventory: "-",
                rank: "+2.4%",
                traffic: "+2.4%",
                impressions: "+2.4%",
                ctr: "-4.1%",
              }}
            />
            <TableRow
              name="SKU 3"
              sales="₹9313"
              outOfStock="1.68%"
              inventory="931.9"
              rank="11"
              traffic="1931.9"
              impressions="₹931.9"
              ctr="1.1%"
            />
            <TableRow
              name="SKU 4"
              sales="₹0"
              outOfStock="0"
              inventory="0"
              rank="0"
              traffic="₹0"
              impressions="₹0"
              ctr="0.0%"
            />
            <tr className="bg-[#f7f7f7] border-t border-[#ebebeb]">
              <td className="py-3 px-2 sm:px-4"></td>
              <td className="py-3 px-2 sm:px-4 text-sm font-medium">Total</td>
              <td className="py-3 px-2 sm:px-4 text-sm font-medium">₹2,93,132.12</td>
              <td className="py-3 px-2 sm:px-4 text-sm font-medium">16%</td>
              <td className="py-3 px-2 sm:px-4 text-sm font-medium">2931</td>
              <td className="py-3 px-2 sm:px-4 text-sm font-medium">8.3</td>
              <td className="py-3 px-2 sm:px-4 text-sm font-medium">61,985</td>
              <td className="py-3 px-2 sm:px-4 text-sm font-medium">2,61,768</td>
              <td className="py-3 px-2 sm:px-4 text-sm font-medium">1.1%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function TableRow({
  checked = false,
  name,
  sales,
  outOfStock,
  inventory,
  rank,
  traffic,
  impressions,
  ctr,
  changes = {},
}) {
  return (
    <tr className="border-b border-[#ebebeb] hover:bg-[#f7f7f7]">
      <td className="py-3 px-2 sm:px-4">
        <Checkbox checked={checked} />
      </td>
      <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm">{name}</td>
      <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm">
        {sales}
        {changes.sales && <div className="text-xs text-[#1d874f]">{changes.sales}</div>}
      </td>
      <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm">
        {outOfStock}
        {changes.outOfStock && <div className="text-xs text-[#1d874f]">{changes.outOfStock}</div>}
      </td>
      <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm">
        {inventory}
        {changes.inventory && <div className="text-xs">{changes.inventory}</div>}
      </td>
      <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm">
        {rank}
        {changes.rank && <div className="text-xs text-[#1d874f]">{changes.rank}</div>}
      </td>
      <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm">
        {traffic}
        {changes.traffic && <div className="text-xs text-[#1d874f]">{changes.traffic}</div>}
      </td>
      <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm">
        {impressions}
        {changes.impressions && <div className="text-xs text-[#1d874f]">{changes.impressions}</div>}
      </td>
      <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm">
        {ctr}
        {changes.ctr && <div className="text-xs text-[#db3500]">{changes.ctr}</div>}
      </td>
    </tr>
  )
}
