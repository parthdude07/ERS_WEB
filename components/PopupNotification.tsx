"use client"

import { useState, useEffect } from 'react'
import { urlFor } from '@/sanity/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react'

interface PopupData {
  _id: string
  title: string
  description?: string
  date: string
  image?: any
  link?: string
  button1?: { label: string; url: string }
  button2?: { label: string; url: string }
}

export default function PopupNotification({ popup }: { popup: PopupData | null }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!popup) return

    // Check if expired: Visible until one day after the event date
    const eventDate = new Date(popup.date)
    const expiryDate = new Date(eventDate)
    expiryDate.setDate(eventDate.getDate() + 1) // Add 1 day

    const now = new Date()
    
    if (now > expiryDate) {
      return // Expired
    }

    // Check if already closed in this session
    const hasSeen = sessionStorage.getItem(`popup-${popup._id}`)
    if (!hasSeen) {
      // Small delay for animation effect
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [popup])

  if (!isVisible || !popup) return null

  const handleClose = () => {
    setIsVisible(false)
    sessionStorage.setItem(`popup-${popup._id}`, 'true')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none">
      {/* Backdrop - optional, maybe just the card? User said "pop up card". 
          Usually a modal has a backdrop. I'll add a slight dim but allow clicking through? 
          No, if it's a notification, maybe bottom right? 
          "shows as popup/notification" -> Could be a modal or a toast. 
          "pop up card" sounds like a modal. 
          I'll make it a centered modal with a backdrop that closes it.
      */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity duration-300"
        onClick={handleClose}
      />
      
      <div className="relative bg-ers-black border border-ers-yellow/50 rounded-lg shadow-[0_0_30px_rgba(244,196,48,0.2)] max-w-md w-full overflow-hidden pointer-events-auto animate-fade-in-up">
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-ers-yellow transition-colors z-10 bg-black/50 rounded-full p-1"
        >
          <X size={20} />
        </button>

        {popup.image && (
          <div className="relative w-full h-48">
            <Image
              src={urlFor(popup.image).url()}
              alt={popup.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ers-black to-transparent" />
          </div>
        )}

        <div className="p-6 relative">
          <h3 className="text-2xl font-display font-bold text-ers-yellow mb-2">{popup.title}</h3>
          
          {popup.description && (
            <p className="text-gray-300 font-body mb-4 text-sm leading-relaxed">
              {popup.description}
            </p>
          )}

          <div className="flex flex-col gap-4 mt-4">
            <span className="text-xs text-gray-500 font-mono">
              {new Date(popup.date).toLocaleDateString(undefined, { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
            
            <div className="flex gap-3">
              {popup.button1?.url && (
                <Link 
                  href={popup.button1.url}
                  className="flex-1 bg-ers-yellow text-black px-4 py-2 rounded font-bold text-sm hover:bg-white transition-colors font-display text-center"
                  onClick={handleClose}
                >
                  {popup.button1.label || "View Details"}
                </Link>
              )}
              
              {popup.button2?.url && (
                <Link 
                  href={popup.button2.url}
                  className="flex-1 border border-ers-yellow text-ers-yellow px-4 py-2 rounded font-bold text-sm hover:bg-ers-yellow hover:text-black transition-colors font-display text-center"
                  onClick={handleClose}
                >
                  {popup.button2.label || "More Info"}
                </Link>
              )}

              {/* Fallback to old link if no buttons are present */}
              {!popup.button1 && !popup.button2 && popup.link && (
                <Link 
                  href={popup.link}
                  className="bg-ers-yellow text-black px-4 py-2 rounded font-bold text-sm hover:bg-white transition-colors font-display ml-auto"
                  onClick={handleClose}
                >
                  View Details
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
