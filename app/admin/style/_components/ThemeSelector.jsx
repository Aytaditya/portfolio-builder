'use client'

import { useContext, useEffect, useState } from 'react'
import { UserDetailContext } from '@/app/_context/UserDetailContext'
import { db } from '@/utils'
import { userInfo } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { toast } from 'react-toastify'
import { Check } from 'lucide-react'
import 'react-toastify/dist/ReactToastify.css';
import { PreviewUpdateContext } from '@/app/_context/PreviewUpdateContext'

const themes = [
  { id: "light", colors: ["#7C3AED", "#EC4899", "#06B6D4", "#1F2937"], name: "light" },
  { id: "dark", colors: ["#818CF8", "#EC4899", "#06B6D4", "#4B5563"], name: "dark" },
  { id: "cupcake", colors: ["#06B6D4", "#F472B6", "#F59E0B", "#1F2937"], name: "cupcake" },
  { id: "bumblebee", colors: ["#FDE047", "#F59E0B", "#FB923C", "#1F2937"], name: "bumblebee" },
  { id: "emerald", colors: ["#34D399", "#818CF8", "#F87171", "#1F2937"], name: "emerald" },
  { id: "corporate", colors: ["#818CF8", "#6B7280", "#34D399", "#1F2937"], name: "corporate" },
  { id: "synthwave", colors: ["#E879F9", "#06B6D4", "#EAB308", "#1F2937"], name: "synthwave" },
  { id: "retro", colors: ["#FDA4AF", "#34D399", "#F59E0B", "#1F2937"], name: "retro" },
  { id: "cyberpunk", colors: ["#F472B6", "#06B6D4", "#818CF8", "#EAB308"], name: "cyberpunk" },
  { id: "valentine", colors: ["#FDA4AF", "#818CF8", "#34D399", "#BE185D"], name: "valentine" },
  { id: "halloween", colors: ["#F97316", "#7C3AED", "#84CC16", "#1F2937"], name: "halloween" },
  { id: "garden", colors: ["#EC4899", "#6B7280", "#34D399", "#1F2937"], name: "garden" },
  { id: "forest", colors: ["#34D399", "#34D399", "#34D399", "#1F2937"], name: "forest" },
  { id: "aqua", colors: ["#06B6D4", "#6B7280", "#EAB308", "#1F2937"], name: "aqua" },
  { id: "lofi", colors: ["#000000", "#1F2937", "#374151", "#1F2937"], name: "lofi" },
  { id: "pastel", colors: ["#D8B4FE", "#6B7280", "#34D399", "#1F2937"], name: "pastel" },
  { id: "fantasy", colors: ["#7C3AED", "#06B6D4", "#F59E0B", "#1F2937"], name: "fantasy" },
  { id: "wireframe", colors: ["#6B7280", "#6B7280", "#6B7280", "#1F2937"], name: "wireframe" },
  { id: "black", colors: ["#1F2937", "#374151", "#4B5563", "#1F2937"], name: "black" },
  { id: "luxury", colors: ["#000000", "#1F2937", "#BE185D", "#EAB308"], name: "luxury" },
  { id: "dracula", colors: ["#EC4899", "#7C3AED", "#F59E0B", "#1F2937"], name: "dracula" },
  { id: "cmyk", colors: ["#06B6D4", "#EC4899", "#EAB308", "#1F2937"], name: "cmyk" },
  { id: "autumn", colors: ["#7F1D1D", "#F87171", "#F59E0B", "#6B7280"], name: "autumn" },
  { id: "business", colors: ["#1E40AF", "#6B7280", "#F97316", "#1F2937"], name: "business" },
  { id: "acid", colors: ["#FB2576", "#F97316", "#84CC16", "#1F2937"], name: "acid" },
  { id: "lemonade", colors: ["#84CC16", "#6B7280", "#EAB308", "#1F2937"], name: "lemonade" },
  { id: "night", colors: ["#06B6D4", "#6B7280", "#EC4899", "#1F2937"], name: "night" },
  { id: "coffee", colors: ["#854D0E", "#34D399", "#06B6D4", "#1F2937"], name: "coffee" },
  { id: "winter", colors: ["#06B6D4", "#818CF8", "#6B7280", "#1F2937"], name: "winter" },
  { id: "dim", colors: ["#34D399", "#F97316", "#6B7280", "#1F2937"], name: "dim" },
  { id: "nord", colors: ["#6B7280", "#6B7280", "#6B7280", "#1F2937"], name: "nord" },
  { id: "sunset", colors: ["#F97316", "#EC4899", "#7C3AED", "#1F2937"], name: "sunset" }
]

export default function ThemeSelector() {
  const [selectedTheme, setSelectedTheme] = useState(null)
  const [hoveredTheme, setHoveredTheme] = useState(null)
  const { selectedThemeName, setSelectedThemeName } = useContext(UserDetailContext)
  const {updatePreview,setUpdatePreview}=useContext(PreviewUpdateContext)
  const { user } = useUser()

  const handleThemeSelect = async (theme) => {
    if (!user?.primaryEmailAddress?.emailAddress) return

    try {
      await db.update(userInfo)
        .set({ theme })
        .where(eq(userInfo.email, user.primaryEmailAddress.emailAddress))
      
      toast.success('Theme updated successfully')
      setUpdatePreview(updatePreview+1) // this will trigger the iframe to reload
    } catch (error) {
      console.error('Error updating theme:', error)
      toast.error('Failed to update theme')
    }
  }

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress && selectedThemeName) {
      handleThemeSelect(selectedThemeName)
    }
  }, [selectedThemeName, user])

  const handleThemeClick = (theme) => {
    setSelectedTheme(theme.id)
    setSelectedThemeName(theme.name)
    handleThemeSelect(theme.name)
  }

  return (
    <div className="max-w-7xl mx-auto p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {themes.map((theme) => (
          <div
            key={theme.id}
            onMouseEnter={() => setHoveredTheme(theme.id)}
            onMouseLeave={() => setHoveredTheme(null)}
            className={`relative rounded-lg ${
              theme.id === 'dark' ? 'bg-gray-800' : 'bg-white'
            } p-3 cursor-pointer transition-all duration-200 ease-in-out ${
              selectedTheme === theme.id
                ? 'ring-2 ring-blue-500 ring-offset-2 scale-105'
                : 'hover:shadow-lg'
            }`}
            onClick={() => handleThemeClick(theme)}
          >
            {selectedTheme === theme.id && (
              <div className="absolute top-1 right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
            <div
              className={`mb-2 ${
                theme.id === 'dark' ? 'text-white' : 'text-gray-800'
              } text-sm font-medium ${
                hoveredTheme === theme.id ? 'opacity-100' : 'opacity-70'
              } transition-opacity duration-200`}
            >
              {theme.name}
            </div>
            <div className="flex gap-1">
              {theme.colors.map((color, index) => (
                <div
                  key={`${theme.id}-${index}`}
                  className="flex-1 aspect-square rounded flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: color }}
                >
                  A
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}