import React from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import './style.css'
import ChatWindow from '../../chat/ChatWindow'
import { changeURL } from '../../../history'
import io from '../../../utils/ioMyLive'
function getTimeIn24Format() {
	var d = new Date()
	var n = d.toLocaleString([], { hour: '2-digit', minute: '2-digit' })
	return n
}

function getDate() {
	let date = new Date()
	console.log(date)
	return date
	// return {m:d.getMonth()+1,d:d.getDate(),y:d.getFullYear()}
}

class ChatScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			meassge: '',
			meassges: [],
			whoIsTypeingNow: [],
			show: false,
		}

		this.scroolDown = React.createRef()
	}
	componentDidMount() {
		if (this.props.call) {
			this.myStream = this.props.call.myStream
			this.theirStream = this.props.call.theirStream
			this.gotAcall = this.props.call.onCall
			this.user = this.props.user
		}
	}
	componentDidUpdate() {
		if (!this.props.isLogin) {
			changeURL('/')
		}
	}
	componentWillUnmount() {
		io.close('typeing' + this.props.chat.chatId)
	}
	scrooDown = () => {
		return (
			<div
				id='hideScrool'
				style={{ float: 'left', clear: 'both' }}
				ref={el => {
					this.scroolDown = el
				}}
			>
				{' '}
			</div>
		)
	}

	scrollToBottom = () => {
		this.meassgesEnd.scrollIntoView({ behavior: 'smooth' })
	}

	addmessage = message => {
		console.log(message)
	}
	onChangeText = e => {
		this.setState({ meassge: e.currentTarget.value })
		io.emit(
			'typeing',
			e.currentTarget.value
				? { senderName: this.user.firstName, show: true, chatId: this.props.chat.chatId }
				: { senderName: this.user.firstName, show: false, chatId: this.props.chat.chatId }
		)
	}

	onEnterPress = e => {
		if (e.keyCode === 13 && e.shiftKey === false) {
			this.handlerClickMSG(e)
		}
	}
	handlerClickMSG = e => {
		e.preventDefault()
		if (!this.state.meassge) return null

		this.setState({ meassge: '' })
		io.emit('typeing', {
			senderName: this.user.firstName,
			show: false,
			chatId: this.props.chat.chatId,
		})
		io.emit('message', {
			message: this.state.meassge,
			senderName: this.user.firstName,
			senderId: this.user.email,
			chatId: this.props.chat.chatId,
			createTime: { time: getTimeIn24Format(), date: getDate() },
		})
	}

	renderSomeOneIsTypeing = () => {
		if (this.state.whoIsTypeingNow.length < 1) return null
		else if (this.state.whoIsTypeingNow.length === 1) {
			return (
				<p>
					<em>{this.state.whoIsTypeingNow}</em> is typeing a meassge
				</p>
			)
		} else {
			let names = ''
			this.state.whoIsTypeingNow.map(name => (names = names + ' ' + name))
			return (
				<p>
					<em>{names}</em> is typeing a meassge
				</p>
			)
		}
	}

	auto_height(elem) {
		elem.style.height = '1px'
		elem.style.height = elem.scrollHeight + 'px'
	}

	render() {
		if (!this.props.isLogin) {
			changeURL('/')
			return <h1>erro</h1>
		}
		if (!this.props.chat.chats[this.props.chat.chatId]) {
			changeURL('/')
			return <h1>dsads</h1>
		}

		return (
			<div id='mario-chat'>
				<div id='feedback'>{this.renderSomeOneIsTypeing()}</div>
				<ChatWindow
					user={this.user}
					mesagesArr={this.props.chat.chats[this.props.chat.chatId].messages}
				/>
				<form onSubmit={this.handlerClickMSG}>
					<InputGroup id='messageinput'>
						<InputGroup.Append>
							<Button
								onClick={this.setUpOffer}
								id='buttonCall'
								style={{
									backgroundColor: this.state.meassge ? 'green' : 'black',
								}}
								variant='outline-secondary'
							>
								call
							</Button>
						</InputGroup.Append>
						<FormControl
							onKeyDown={this.onEnterPress}
							as='textarea'
							rows='1'
							aria-multiline
							autoComplete='off'
							onChange={this.onChangeText}
							value={this.state.meassge}
							type='text'
							placeholder='type a message'
						/>
						<InputGroup.Append>
							<Button
								id='buttonChat'
								style={{
									backgroundColor: this.state.meassge ? '#575ed8' : '#898bce',
								}}
								type='submit'
								variant='outline-secondary'
							></Button>
						</InputGroup.Append>
					</InputGroup>
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	call: state.call,
	user: state.user,
	isLogin: state.auth.isLogin,
	chat: state.chatArea,
	languages: state.languages,
})

export default connect(mapStateToProps, {})(ChatScreen)
