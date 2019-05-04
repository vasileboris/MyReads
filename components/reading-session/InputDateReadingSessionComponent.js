import React from 'react';
import PropTypes from 'prop-types';
import {
    View
} from 'react-native';
import appStyles from 'styles/AppStyles';
import appColors from 'styles/AppColors';
import localizer from 'utils/Localizer';
import TextInput from 'components/input/TextInput';
import NumberInput from 'components/input/NumberInput';
import Button from 'components/button/Button';

const InputDateReadingSessionComponent = props => {
    const {
        dateReadingSession,
        operation,
        onInputChange,
        onAddButtonClick,
        onUpdateButtonClick,
        onDeleteButtonClick,
        onConfirmDeleteButtonClick,
        onCancelButtonClick
    } = props;
    return (
        <View style={[appStyles.entry, appStyles.vertical, appStyles.justifyStart]}>
            <TextInput name="date"
                       placeholder={localizer.localize('date-reading-session-date-text')}
                       value={dateReadingSession.date ? dateReadingSession.date : ''}
                       onInputChange={onInputChange}
                       editable={'add' === operation}/>
            <NumberInput name="lastReadPage"
                         placeholder={localizer.localize('date-reading-session-last-read-page-text')}
                         value={dateReadingSession.lastReadPage ? dateReadingSession.lastReadPage : ""}
                         onInputChange={onInputChange}
                         editable={'delete' !== operation}/>
            <TextInput name="bookmark"
                       placeholder={localizer.localize('date-reading-session-bookmark-text')}
                       value={dateReadingSession.bookmark ? dateReadingSession.bookmark : ""}
                       onInputChange={onInputChange}
                       editable={'delete' !== operation}/>

           {'add' === operation && (
           <Button onPress={onAddButtonClick}
                   title={localizer.localize('add-button')}/>
           )}
           {'edit' === operation && (
           <React.Fragment>
               <Button onPress={onUpdateButtonClick}
                       title={localizer.localize('update-button')}/>
               <Button onPress={onDeleteButtonClick}
                       title={localizer.localize('delete-button')}/>
           </React.Fragment>
           )}
           {'delete' === operation && (
           <Button onPress={onConfirmDeleteButtonClick}
                   title={localizer.localize('delete-button')} color={appColors.colorDelete}/>
           )}
           <Button onPress={onCancelButtonClick}
                   title={localizer.localize('cancel-button')}/>
        </View>
    );
};

InputDateReadingSessionComponent.propTypes = {
    operation: PropTypes.oneOf(['add', 'edit', 'delete']).isRequired,
    dateReadingSession: PropTypes.shape({
        date: PropTypes.string,
        lastReadPage: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        bookmark: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])
    }),
    onInputChange: PropTypes.func,
    onAddButtonClick: PropTypes.func,
    onUpdateButtonClick: PropTypes.func,
    onDeleteButtonClick: PropTypes.func,
    onConfirmDeleteButtonClick: PropTypes.func,
    onCancelButtonClick: PropTypes.func
};

export default InputDateReadingSessionComponent;
