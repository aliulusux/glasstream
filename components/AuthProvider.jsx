"use client";
import {supabase}from"@/lib/supabaseClient";
import {createContext,useContext,useEffect,useState}from"react";

const Ctx=createContext({user:null});

const cleanSession = JSON.parse(JSON.stringify(session || null));

export default function AuthProvider({children}){
    const[user,setUser]=useState(null);useEffect(()=>{
        supabase.auth.getUser().then(({data})=>setUser(data?.user||null));
        const{sub}=supabase.auth.onAuthStateChange((_e,session)=>setUser(session?.user||null));
        return()=>sub.subscription?.unsubscribe?.()},[]);
        return <Ctx.Provider value={{cleanUser}}>{children}</Ctx.Provider>}

        export function useAuth(){return useContext(Ctx)}