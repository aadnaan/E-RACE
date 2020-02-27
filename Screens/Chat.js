import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {Platform,KeyboardAvoidingView,View} from 'react-native'
import {firestore} from '../config/Config.js'

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      refresh:true,
      user:null,
      docID:null,
      ListerID:null,
      RenterID:null
    }
  }
static navigationOptions = ({ navigation }) => {
  return {
    title: 'Chat'
  };
};
  async componentDidMount() {
    await this.setState({
      ListerID:this.props.navigation.state.params.ListerID,
      RenterID:this.props.navigation.state.params.RenterID
    })
    await this.getMessages();
  }
  getMessages(){
    that=this
    console.log("awdwa")
    console.log(this.state.Renter)
    firestore.collection('Chat').where('ListerID', '==', this.state.ListerID).where('RenterID', '==', this.state.RenterID).onSnapshot((snapshot)=>{
      snapshot.docs.forEach(doc => {
          const exists=(doc.data()!==null)
          console.log(doc.data())
          if(exists){
            data=doc.data();
            this.setState({
              user:data.ListerName,
              docID:doc.id
            })
            doc.ref.collection('Messages').onSnapshot((snapshot1)=>{
              this.setState({
                messages:[],
              })
              snapshot1.docs.forEach(doc1=>{
                const exists1=(doc1.data()!==null)
                if(exists1){
                  data1=doc1.data();
                  var Chat_feed=that.state.messages;
                  Chat_feed.push({
                    _id:doc1.id,
                    text:data1.Message,
                    createdAt:data1.TimeStamp.toDate(),
                    user:{
                      _id:data1.SenderID,
                      name:data1.SenderName,
                    }
                  })
                  console.log(Chat_feed)
                  this.state.messages.sort((a,b)=> b.createdAt - a.createdAt)
                  this.setState({
                    refresh:false
                  })
                }
              })
            })
          }
      })
  })
  }
  onSend(messages = []) {
    var msg={
      SenderID:messages[0].user._id,
      SenderName:messages[0].user.name,
      TimeStamp:messages[0].createdAt,
      Message:messages[0].text,
    }
    firestore.collection('Chat').doc(this.state.docID).collection('Messages').add(msg)
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
    <View style={{flex:1}}>
      {this.state.refresh == false? 
        <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
            _id: this.state.ListerID,
            name:this.state.user
            }}
        />
        : null }
        <KeyboardAvoidingView behavior="padding" />  
        
    </View>
    )
  }
}