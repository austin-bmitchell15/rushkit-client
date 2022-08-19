import React, { useState, useEffect } from 'react'
import ChipInput from 'material-ui-chip-input';
import AutoSuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { Paper, MenuItem } from '@material-ui/core';

import useStyles from './styles.js'


const renderInput = (inputProps) => {
    const { value, onChange, chips, ref, label, ...other } = inputProps;

    return (
        <ChipInput
            fullWidth
            clearInputValueOnChange
            onUpdateInput={onChange}
            value={chips}
            inputRef={ref}
            label="Interests/Hobbies"
            {...other}
        />
    );
};

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion, query);
    const parts = parse(suggestion, matches);

    return (
        <MenuItem selected={isHighlighted}
            component="div"
            onMouseDown={(e) => e.preventDefault()}
        >
        <div>
            {parts.map((part, index) => {
            return part.highlight ? (
                <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
                </span>
            ) : (
                <span key={String(index)}>{part.text}</span>
            );
            })}
        </div>
        </MenuItem>
    );
};

const renderSuggestionsContainer = (options) => {
    const { containerProps, children } = options;

    return (
        <Paper {...containerProps}>
            {children}
        </Paper>
    );
};

const getSuggestionValue = (suggestion) => {
    return suggestion;
};

const ChipInputAutoSuggest = (props) => {
    const classes = useStyles();
    const { data } = props;
    const [suggestion, setSuggestion] = useState([]);
    const [values, setValues] = useState([]);
    const [textFieldInput, setTextFieldInput] = useState("");
  
    useEffect(() => {
      setSuggestion(data);
    }, []);
  
    const getSuggestions = (value) => {
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;
      let count = 0;
  
      return inputLength === 0
        ? []
        : data.filter((suggestion) => {
            const keep =
              count < 5 &&
              suggestion.toLowerCase().slice(0, inputLength) === inputValue;
  
            if (keep) {
              count += 1;
            }
  
            return keep;
          });
    };
  
    const handleSuggestionsFetchRequested = ({ value }) => {
      setSuggestion(getSuggestions(value));
    };
  
    const handleSuggestionsClearRequested = () => {
      setSuggestion([]);
    };
  
    const handletextFieldInputChange = (event, { newValue }) => {
      setTextFieldInput(newValue);
    };
  
    const handleAddChip = (chip) => {
      setValues([...values, chip]);
      setTextFieldInput("");
    };
  
    const handleDeleteChip = (chip, index) => {
      values.splice(index, 1);
      setValues([...values]);
    };
  
    return (
      <AutoSuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        renderInputComponent={renderInput}
        suggestions={suggestion}
        onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={(e, { suggestionValue }) => {
          handleAddChip(suggestionValue);
          e.preventDefault();
        }}
        focusInputOnSuggestionClick
        inputProps={{
          chips: values,
          value: textFieldInput,
          onChange: handletextFieldInputChange,
          onAdd: (chip) => handleAddChip(chip),
          onDelete: (chip, index) => handleDeleteChip(chip, index)
        }}
      />
    );
};

export default ChipInputAutoSuggest