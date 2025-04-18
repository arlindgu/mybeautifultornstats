"use client";

import Header from "@/components/header";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";

export default function WelcomePage() {

    const { username, player_id } = useProfile();


    return (
        <div>
            <Header />
            
        </div>
    );
}