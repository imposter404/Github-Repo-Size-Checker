import { useEffect, useState } from "react";
import { Alert, Button, Image,StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const [input,setInput]=useState()
  const [data,setData]=useState()
  // const [data,setData]=useState({
  //     owner:{login:2},
  //     stargazers_count:2,
  //     watchers_count:2,
  //     forks_count:2,
  //     full_name:2,
  //     language:2,
  //   })
  const [error,setError]=useState(false)




function check(){
    console.log(":f")
    console.log(input)
    console.log(data)
    if(input.includes('https://github.com/')){
        console.log(input)
        try {
        fetch(input.replace('https://github.com/','https://api.github.com/repos/'))
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            if('status' in res && res.status=='404'){
                console.log("res")
                setError(true)
            }
            else{
                setData(res)
            }
        })  
        } catch (error) {
            Alert.alert("error")
        }
    }
    else{
        alert("Wrong Input")
    }
}


function sizeMatch(){
    const sizeType=["KB","MB","GB"]
    let size=data.size
    let ptr=0
    for(let i=0;i<sizeType.length;i++){
        if(size<1024){
            size=size.toFixed(2)
            return (size+" "+sizeType[ptr]);
        }
        size=size/1024
        ptr++;
    }
}



const viewData= ()=>{
  return(
<>
<Text style={{fontSize:30,color:"#fff"}}>Repository Size</Text>
<Text style={{fontSize:24,color:"#fff"}}>128 KB</Text>

<View style={{display:'flex',flexDirection:'row',marginTop:20}}>
  <View style={{flex:1}}>
    <View style={{width:'100%',aspectRatio:1/1,backgroundColor:"#fff",borderRadius:'50%',overflow:"hidden"}}>
      {/* <Image source={require(data.owner.avatar_url)}  resizeMode="contain" /> */}
    </View>
  </View>
  <View style={{flex:2,display:'flex',marginLeft:10}}>
    <View style={{display:'flex',flexDirection:'row',height:24,marginVertical:4,borderBottomWidth:2,paddingBottom:40,borderBottomColor:'#d4d4d4ff'}}>
      <Image source={require("./../assets/icon/people.png")} style={{marginHorizontal:4}} />
      <Text style={{color:"#fff",fontSize:18}}>{data.owner.login}</Text>
    </View>
    <View style={{display:'flex',flexDirection:'row',height:24,marginVertical:4,marginBottom:20,marginTop:10}}>
      <View style={{flex:1,display:'flex',flexDirection:'row'}}>
        <Image source={require("./../assets/icon/star.png")} style={{marginHorizontal:4}} />
        <Text style={{color:"#fff",fontSize:18}}>{data.stargazers_count}</Text>
      </View>
      <View style={{flex:1,display:'flex',flexDirection:'row'}}>
        <Image source={require("./../assets/icon/eye.png")} style={{marginHorizontal:4}} />
        <Text style={{color:"#fff",fontSize:18}}>{data.watchers_count}</Text>
      </View>
      <View style={{flex:1,display:'flex',flexDirection:'row'}}>
        <Image source={require("./../assets/icon/fork.png")} resizeMode="contain" style={{marginHorizontal:4,flex:1,height:null}} />
        <Text style={{color:"#fff",fontSize:18,flex:1}}>{data.forks_count}</Text>
      </View>
    </View>
    <View style={{display:'flex',flexDirection:'row',height:24,marginVertical:4,paddingBottom:"40px"}}>
      <Image source={require("./../assets/icon/repo.png")} style={{marginHorizontal:4}} />
      <Text style={{color:"#fff",fontSize:18}}>{data.full_name}</Text>
    </View>
    <View style={{height:24,backgroundColor:'#002fffff',width:"fit-content",width:"80px",height:"40px",borderRadius:50,justifyContent:'center',alignItems:'center'}}>
      <Text style={{color:"#fff",fontSize:18}}>{data.language}</Text>
    </View>
  </View>
</View>
</>

)}

const err=()=>{
    return(
        <>
            <Text className="text-2xl">Unable to find the Github Repo </Text>
            <Text>Err :: 404</Text>
        </>
    )
}







  return (
    <View style={[styles.home,{backgroundColor:"#0f0030"}]}>
      <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
        <View style={{padding:30}}>
          <Text style={{fontSize:'26px',color:'#FFF'}}>Github Repo Size Checker</Text>
        </View>
        <View style={{borderWidth:2,borderColor:'#008cffff',borderRadius:10,overflow:'hidden',width:'70dvw'}}>
          <TextInput style={{paddingVertical:10,color:"#ffffffff",paddingHorizontal:5}} placeholder="https://github.com/" onChangeText={text=>setInput(text)}></TextInput>
          <Button style={{paddingVertical:10}} title="Check"onPress={check}></Button>
        </View>
      </View>
      <View style={{flex:3,paddingHorizontal:20}}>
        <View style={{backgroundColor:"#008cffff",height:"100%",borderTopLeftRadius:20,borderTopRightRadius:20,padding:20}}>
          {
              data == undefined ? 
              <View>
                  <Text style={{color:'#fff'}}>Paste your github repository link </Text>
                  <Text style={{color:'#fff'}}>and Click Check </Text>
              </View>
              : error==true ? err()
              : viewData
          }
        </View>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  home :{
    height:'100dvh',
    backgroundColor:'#313131ff',
    display:"flex",
    flexDirection:'column'
  },
});