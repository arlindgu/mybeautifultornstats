"use client";

import Header from "@/components/header";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";

export default function WelcomePage() {

    const { username, player_id } = useProfile();


    return (
        <div className="flex flex-col justify-center items-center h-screen gap-4">
            <div className="flex flex-col">
                <h1 className="font-bold">API Key</h1>
                <p className="text-sm w-200">Your API key is not stored on any server and will never be sent anywhere. It stays 100% on your device. It’s stored in your browser’s localStorage. You can check this by opening your browser’s developer tools → Application → localStorage.
                </p>
                <a className="underline" href="https://developer.chrome.com/docs/devtools/storage/localstorage/">Google Chrome</a>
                <a className="underline" href="https://firefox-source-docs.mozilla.org/devtools-user/storage_inspector/index.html#local_storage">Mozilla Firefox</a>
            </div>
            <div className="flex flex-col">
                <h1 className="font-bold">API Responses & Call History</h1>
                <p className="text-sm w-200">All API calls and their responses are stored locally using your browser’s IndexedDB – not uploaded or synced anywhere.
                    To inspect this, open your browser’s developer tools → Application → IndexedDB.</p>
                <a className="underline" href="https://developer.chrome.com/docs/devtools/storage/indexeddb/">Google Chrome</a>
                <a className="underline" href="https://developer.mozilla.org/en-US/docs/Tools/Storage_Inspector#indexeddb">Mozilla Firefox</a>
            </div>
            <div className="flex flex-col">
                <h1 className="font-bold">Still don’t trust it?</h1>
                <p className="text-sm w-200">Then just don’t use it. Simple as that.</p>
            </div>
        </div>
    );
}