import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import {TextInput,ScrollView, View, Text, StyleSheet,Button } from 'react-native'
import { Session } from '@supabase/supabase-js'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [fetchError, setFetchError] = useState("")
  const [testData, setTestData]= useState<any>(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    const fetchData = async () => {
      const { data, error } = await supabase
      .from('Shows')
      .select('*')
      if (error) {
        setFetchError("Could not fetch the data")
        setTestData(null)
      }
      if (data) {
        setTestData(data)
        setFetchError("")
      }
    }
    fetchData()
  }, [])
  return (
    <View style={styles.main}>
      {!session && <Auth />}
      <View style={styles.topBox}>
        <View style={{height: 20}} />
        <TextInput style={{height: 50, borderColor: 'gray',borderRadius:8, borderWidth: 1, backgroundColor: '#ffffff', width: "90%", margin: 10, padding: 10}} placeholder="Search" />
      </View>
      <ScrollView style={{width: "100%"}}>
        {testData && testData.map((item: any) => (
          <View style={styles.box} key={item.id}>
            <Text style={styles.text}>
              {item.ShowName}
            </Text>
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
    height: 200,
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
  text:{
    color: '#ffffff',
    paddingTop: 160,
  },
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})
