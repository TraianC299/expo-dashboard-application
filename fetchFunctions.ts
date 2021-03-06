import { Platform } from "react-native"
import { BASE_URL } from "./constants/Vars"
import * as ImageManipulator from 'expo-image-manipulator';




export async function  getAdminData(url, token) {

    return fetch(BASE_URL + url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization" :"Bearer " + token
                  }
        }).then((response) => {
            return response.json()
        })
}

export async function  toggleData(url, token) {

    return fetch(BASE_URL + "dash/toggle/"+url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization" :"Bearer " + token
                  }
        }).then((response) => {
            return response.json()
        })
}


export async function  getData(url) {

    return fetch(BASE_URL + url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

                  }
        }).then((response) => {
            return response.json()
        })
}

// "test@gmail.com"
// "testpass"
export async function postAdminData(url, data, token) {

    return fetch(BASE_URL + url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization" :"Bearer " + token
        },
        body: JSON.stringify({
            ...data
        })
        })
        .then((response) => response.json())
            
}


export async function postData(url, data) {

    return fetch(BASE_URL + url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...data
        })
        })
        .then((response) => response.json())
            
}




export async function postImage(result:object, dimensions:number){
    const manipulatedImage = await ImageManipulator.
manipulateAsync(result.uri, [
{resize: {width: dimensions, height: dimensions}},
],
{compress: 0.5, format: ImageManipulator.SaveFormat.PNG});
    const responseBlob = await fetch(manipulatedImage.uri);
    const img = await responseBlob.blob();
    const data = new FormData();
  data.append('file', {
    name: img._data.name,
    type: img._data.type,
    uri: Platform.OS === 'ios' ? 
    manipulatedImage.uri.replace('file://', '')
         : result.uri,
  });

    const response =  await fetch(`https://commo-store.com/api/images/upload`, {
        method: 'POST',
        body: data,
        headers: {
            "Content-Type": "multipart/form-data",
          },
    })
    const json = await response.json()
    console.log(JSON.stringify(json))
    return json
   

}
export async function updateData(url:string, data:object, token:string) {

    return fetch(BASE_URL + url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization" :"Bearer " + token
        },
        body: JSON.stringify({
            ...data
        })
        })
        .then((response) => response.json())
        
}

export async function deleteData(url, token) {

    return fetch(BASE_URL + url, {
        method: 'DELETE',
        headers: {
             'Accept': 'application/json',
             "Authorization" :"Bearer " + token
        },
       
        })
        .then((response) => response.json())
            


}