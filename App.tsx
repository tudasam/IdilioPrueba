import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import {TextInput,ScrollView, View, Text, StyleSheet,Pressable, FlatList} from 'react-native'
import { Session } from '@supabase/supabase-js'

type Show = {
  id: string
  show_name: string
  summary?: string | null
  poster?: string | null
  categories?: string[] | null
  chapter_list?: string[] | null
}
type Grouped = Record<string, Show[]>


export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [fetchError, setFetchError] = useState("")
  const [orgData, setOrgData] = useState<Grouped>({})
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    function normalizeGrouped(input: any): Grouped {
      if (!input) return {}
      // Some setups return [{ get_all_categories_with_shows: {...} }]
      if (Array.isArray(input)) {
        const row = input[0]
        const payload = row?.get_all_categories_with_shows ?? row
        return (payload && typeof payload === 'object') ? payload as Grouped : {}
      }
      // Or it may already be the object
      const payload = (input as any).get_all_categories_with_shows ?? input
      return (payload && typeof payload === 'object') ? payload as Grouped : {}
    }

    const fetchOrgData = async () => {
      const { data, error } = await supabase.rpc('get_all_categories_with_shows')
      if (error) {
        setFetchError('Could not fetch the data')
        setOrgData({})
        return
      }
      setOrgData(normalizeGrouped(data))
      setFetchError('')
    }
    fetchOrgData()
    
  }, [])
  return (
    <View style={styles.main}>
      {!session && <Auth />}
      <View style={styles.topBox}>
        <View style={{height: 20}} />
        <TextInput style={{height: 50, borderColor: 'gray',borderRadius:8, borderWidth: 1, backgroundColor: '#ffffff', width: "90%", margin: 10, padding: 10}} placeholder="Search" />
      </View>
      <ScrollView style={{ width: '100%' }} contentContainerStyle={{ paddingBottom: 24 }}>
        {Object.entries(orgData).map(([category, shows]) => (
          <View key={`cat-${category}`} style={styles.category}>
            <View  >
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 18, marginLeft: 16, marginBottom: 8 }}>
                {category}
              </Text>
            </View>

            <FlatList
              horizontal
              data={shows}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable style={styles.box} key={item.id}>
                  <Text style={styles.text}>{item.show_name}</Text>
                </Pressable>
              )}
            />
          </View>
        ))}
      </ScrollView>
      
      {session && session.user && <Text>{session.user.id}</Text>}
      
    </View>
  )
}
const styles = StyleSheet.create({
  main:{
    flex: 1,
    backgroundColor: '#000000ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box:{
    backgroundColor: 'rgba(73, 26, 12, 1)',
    borderRadius: 20,
    padding: 10,
    margin: 10,
    width: 200,
    height: 300,
    textAlign: 'center',
    alignSelf: 'center',
  },
  topBox:{
    backgroundColor: 'rgba(131, 43, 17, 1)',
    padding: 10,
    margin: 10,
    width: 350,
    height: 100,
    textAlign: 'center',
    alignSelf: 'center',
  },
  category:{
    backgroundColor: 'rgba(34, 17, 3, 1)',
    borderRadius: 10,
    margin: 10,
  
    textAlign: 'left',
  },
  text:{
    color: '#ffffff',
    paddingTop: 250,
  },
})
