import React from 'react';
import PropTypes from 'prop-types';
import {
    View
} from 'react-native';
import { connect } from 'react-redux';
import MessageComponent from 'components/message/MessageComponent';
import DateReadingSessionsComponent from 'components/reading-session/DateReadingSessionsComponent';
import InputDateReadingSessionComponent from 'components/reading-session/InputDateReadingSessionComponent';
import {
    changeDateReadingSessionFieldAction,
    changeDateReadingSessionAction,
    clearDateReadingSessionAction,
    createDateReadingSessionAction,
    updateDateReadingSessionAction,
    deleteDateReadingSessionAction
} from 'actions/DateReadingSessionAction';
import { fetchCurrentReadingSessionAction } from 'actions/ReadingSessionAction';
import { changeDateReadingSessionOperationAction } from 'actions/OperationAction';
import { receiveMessageAction } from 'actions/MessageAction';
import appStyles from 'styles/AppStyles';
import localizer from 'utils/Localizer';

class CurrentReadingSessionScreen extends React.Component {
    static navigationOptions = () => {
        return {
            title: localizer.localize('current-reading-session-screen')
        };
    };

    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.onAddDateReadingSessionClick = this.onAddDateReadingSessionClick.bind(this);
        this.onEditDateReadingSessionClick = this.onEditDateReadingSessionClick.bind(this);
        this.onUpdateDateReadingSessionClick = this.onUpdateDateReadingSessionClick.bind(this);
        this.onDeleteDateReadingSessionClick = this.onDeleteDateReadingSessionClick.bind(this);
        this.switchToAddDateReadingSession = this.switchToAddDateReadingSession.bind(this);
        this.onConfirmDeleteDateReadingSessionClick = this.onConfirmDeleteDateReadingSessionClick.bind(this);
    }

    render() {
        const { message, bookUuid, operation, dateReadingSession, currentReadingSessions } = this.props,
            currentReadingSession = currentReadingSessions[bookUuid],
            dateReadingSessions = currentReadingSession ? currentReadingSession.dateReadingSessions : [];

        return (
            <View style={[appStyles.screen, appStyles.vertical, appStyles.justifyStart]}>
                <MessageComponent message={message}/>
                <InputDateReadingSessionComponent
                    operation={operation}
                    dateReadingSession={dateReadingSession}
                    onInputChange={this.onInputChange}
                    onAddButtonClick={this.onAddDateReadingSessionClick}
                    onUpdateButtonClick={this.onUpdateDateReadingSessionClick}
                    onDeleteButtonClick={this.onDeleteDateReadingSessionClick}
                    onConfirmDeleteButtonClick={this.onConfirmDeleteDateReadingSessionClick}
                    onCancelButtonClick={this.switchToAddDateReadingSession}/>
                <DateReadingSessionsComponent dateReadingSessions={dateReadingSessions}
                                              onDateReadingSessionClick={this.onEditDateReadingSessionClick}/>
            </View>
        );
    }

    componentDidMount() {
        this.retrieveCurrentReadingSession();
    }

    onInputChange(value, name) {
        const { changeDateReadingSessionFieldAction } = this.props;
        changeDateReadingSessionFieldAction(name, value);
    }

    retrieveCurrentReadingSession() {
        const { fetchCurrentReadingSessionAction, bookUuid } = this.props;
        fetchCurrentReadingSessionAction(bookUuid);
    }

    onAddDateReadingSessionClick() {
        const { dateReadingSession, createDateReadingSessionAction, bookUuid, currentReadingSessions } = this.props,
            currentReadingSession = currentReadingSessions[bookUuid];
        createDateReadingSessionAction(bookUuid, currentReadingSession.uuid, dateReadingSession);
    }

    onEditDateReadingSessionClick(dateReadingSession) {
        const { receiveMessageAction, changeDateReadingSessionOperationAction, changeDateReadingSessionAction } = this.props;
        receiveMessageAction(null);
        changeDateReadingSessionOperationAction('edit');
        changeDateReadingSessionAction(dateReadingSession);
    }

    onUpdateDateReadingSessionClick() {
        const { dateReadingSession, updateDateReadingSessionAction, bookUuid, currentReadingSessions } = this.props,
            currentReadingSession = currentReadingSessions[bookUuid];
        updateDateReadingSessionAction(bookUuid, currentReadingSession.uuid, dateReadingSession);
    }

    onDeleteDateReadingSessionClick() {
        const { receiveMessageAction, dateReadingSession, changeDateReadingSessionOperationAction, changeDateReadingSessionAction } = this.props;
        receiveMessageAction(null);
        changeDateReadingSessionOperationAction('delete');
        changeDateReadingSessionAction(dateReadingSession);
    }

    onConfirmDeleteDateReadingSessionClick() {
        const { dateReadingSession, deleteDateReadingSessionAction, bookUuid, currentReadingSessions } = this.props,
            currentReadingSession = currentReadingSessions[bookUuid];
        deleteDateReadingSessionAction(bookUuid, currentReadingSession.uuid, dateReadingSession.date);
    }

    switchToAddDateReadingSession() {
        const { changeDateReadingSessionOperationAction, clearDateReadingSessionAction, receiveMessageAction } = this.props;
        changeDateReadingSessionOperationAction('add');
        clearDateReadingSessionAction();
        receiveMessageAction(null);
    }
}

CurrentReadingSessionScreen.propTypes = {
    bookUuid: PropTypes.string.isRequired,
    message: PropTypes.string,
    operation: PropTypes.oneOf(['add', 'edit', 'delete']).isRequired,
    dateReadingSession: PropTypes.object,
    currentReadingSessions: PropTypes.object
};

const mapStateToProps = state => {
    const { message, book, readingSessions } = state;
    return {
        message,
        bookUuid: book.uuid,
        ...readingSessions
    };
};

const mapDispatchToProps = {
    receiveMessageAction,
    changeDateReadingSessionFieldAction,
    changeDateReadingSessionAction,
    clearDateReadingSessionAction,
    createDateReadingSessionAction,
    updateDateReadingSessionAction,
    deleteDateReadingSessionAction,
    fetchCurrentReadingSessionAction,
    changeDateReadingSessionOperationAction
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentReadingSessionScreen);
