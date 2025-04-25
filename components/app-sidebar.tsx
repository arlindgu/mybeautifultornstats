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
import { ChevronDown, HandCoins, PersonStandingIcon, Dumbbell, Check, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Badge } from "./ui/badge"

export function AppSidebar() {

    const [profileName, setProfileName] = useState("")

    useEffect(() => {
        async function loadProfile() {
            console.log("Loading profile from IndexedDB")
            const db = await openDB('mbts-db', 1)
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
            <SidebarHeader>
                <SidebarMenuButton className="h-fit">
                    <span id="nameandid" className="font-bold">{profileName}</span>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Profile</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem>

                            <SidebarMenuButton asChild>


                                <Link href="/dashboard">
                                    <PersonStandingIcon />
                                    Dashboard
                                    <Badge className="bg-green-700" variant="default"><Check color="white" /></Badge>
                                </Link>

                            </SidebarMenuButton>

                        </SidebarMenuItem>
                        <SidebarMenuItem>

                            <SidebarMenuButton asChild>
                                <Link href="/battlestats">
                                <Dumbbell />
                                Battlestats
                                <Badge className="bg-red-700" variant="default"><X color="white"/></Badge>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Money</SidebarGroupLabel>
                    <SidebarMenu>
                        <Collapsible defaultOpen className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild className="group flex w-full items-center">
                                
                                    <SidebarMenuButton asChild>
                                    <Link href="/moneyincoming" className="flex items-center gap-2">
                                            <HandCoins /> Money Incoming
                                        <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                        </Link>
                                    </SidebarMenuButton>
                                    
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton>
                                                Companies Pay
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                        <Collapsible defaultOpen className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild className="group flex w-full items-center">
                                    <SidebarMenuButton className="flex w-full items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            <HandCoins /> Money Outgoing
                                        </span>
                                        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton>
                                                Banazar
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>

                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
