"use client"
import { openDB } from "idb"
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarGroupLabel,

} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { ChevronDown, HandCoins, PersonStandingIcon, Dumbbell, Cog, Check, X, Building2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { initDatabase } from "@/lib/initDatabase"

export function AppSidebar() {

    const [profileName, setProfileName] = useState("")

    const simpleMenu = [
        {
            label: "Profil",
            items: [
                { label: "Dashboard", path: "/dashboard", icon: <PersonStandingIcon /> },
                { label: "Battlestats", path: "/battlestats", icon: <Dumbbell /> },
            ]
        },
        {
            label: "Fighting",
            items: [
                { label: "Attack Log", path: "/fighting/attacks", icon: <HandCoins /> },
                { label: "Rankings", path: "/fighting/rankings", icon: <Building2 /> },
            ]
        }
    ];

    const nestedMenu = [
        {
            label: "Other",
            categories: [
                {
                    label: "Resources",
                    items: [
                        { label: "Items", path: "/resources/items" },
                    ]
                }
            ]
        },
        {
            label: "User Data",
            categories: [
                {
                    label: "Profil",
                    items: [
                        { label: "Übersicht", path: "/user/profil" },
                        { label: "Medals", path: "/user/profil/medals" },
                    ]
                },
                {
                    label: "Finanzen",
                    items: [
                        { label: "Networth", path: "/user/finanzen/networth" },
                        { label: "Stocks", path: "/user/finanzen/stocks" },
                    ]
                }
            ]
        },
        {
            label: "Kämpfen",
            categories: [
                {
                    label: "Stats",
                    items: [
                        { label: "Battlestats", path: "/fight/stats" },
                        { label: "Energy Log", path: "/fight/energy" },
                    ]
                }
            ]
        }
    ];


    useEffect(() => {
        async function loadProfile() {
            console.log("Loading profile from IndexedDB")
            const db = await openDB('MBTS')
            const profile = await db.get('profile', 'profile')
            console.log(profile)
            if (profile) {
                setProfileName(`${profile.name} [${profile.player_id}]`)
            }
        }

        loadProfile()
    }, [])

    const router = useRouter()

    return (
        
        <Sidebar collapsible="icon">
            <SidebarContent>
            <SidebarHeader>
                <SidebarMenuButton className="h-fit" asChild>
                    <Link id="nameandid" href="/settings" className="font-bold">{profileName}</Link>
                </SidebarMenuButton>
            </SidebarHeader>
            {simpleMenu.map((menu, index) => (
                <SidebarGroup key={index} className="group">
                    <SidebarGroupLabel>{menu.label}</SidebarGroupLabel>

                    {menu.items.map((item, itemIndex) => (
                        <SidebarMenuItem key={itemIndex}>
                            <SidebarMenuButton asChild>
                                <Link href={item.path} className="flex items-center gap-2">
                                {item.icon}
                                {item.label}
                                    </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarGroup>
            ))}
            

                {nestedMenu.map((menu, index) => (
  <SidebarGroup key={index} className="group">
    <SidebarGroupLabel>{menu.label}</SidebarGroupLabel>

    {menu.categories.map((category, catIndex) => (
      <Collapsible key={catIndex} defaultOpen className="group/collapsible">
        <CollapsibleTrigger asChild className="group flex w-full items-center">
          <SidebarMenuButton>
            {category.label}
            <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <SidebarMenuSub>
            {category.items.map((item, itemIndex) => (
              <SidebarMenuSubItem key={itemIndex}>
                <SidebarMenuSubButton asChild>
                  <Link href={item.path} className="flex items-center gap-2">
                    {item.label}
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    ))}
  </SidebarGroup>
))}

            </SidebarContent>
        </Sidebar>
    )
}
