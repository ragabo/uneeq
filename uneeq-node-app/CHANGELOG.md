# Changelog

## [1.3.1] - 2021-01-18

### Fixed

- Fixed issue where debounced sendText() / UneeQ SDK sendTranscript() causes circular reference during render if clickable utterances are used alongside video content in the same OnScreenInfo component instance.

## [1.3.0] - 2020-12-17

### Changed

- Added video type to `InformationContent` component.

E.g:

```json
{
  "instructions": {
    "displayHtml": {
      "html": "{\"information\": [{\"type\": \"heading\", \"text\": \"Video heading here\"},{ \"type\": \"video\", \"source\": \"https://www.youtube.com/embed/rF2u7RTPsHI\"}]}"
    }
  }
}
```

## [1.2.0] - 2020-12-08

### Changed

- Markdown in `InformationContent` component now accepts URLs in format `say:UTTERANCE` where `UTTERANCE` is the word or phrase that should be automatically spoken to the digital human when the link is clicked.

E.g.

```json
[Accept the deal](say:Yes I would like the deal)
```

### Fixed

- Added extra checks to uneeqCommandReducer for suggestedResponses in case an empty array of suggested responses is sent from backend conversation service.

## [1.1.2] - 2020-09-23

### Changed

- Allow sendLocalAudio:false

## [1.1.1] - 2020-09-17

### Fixed

- Call onTimedOut at end of timeout
- Center Suggested Responses on tablet-size layout
- Adjust bottom limit of OnScreenInfo to avoid overlap with user question text

### Changed

- Add 'video' to example privacy policy

## [1.1.0] - 2020-09-11

### Changed

- Colors for Push-to-Talk button are now set in the theme
  - see example-app/src/theme.ts `// PTT animation` and `// PTT desktop colors & gradients`
- PDF Downloads can include SessionId
  - see example-app/src/app/downloadPdf.ts
- Feedback form remembers user input
- Improvements to example-app home page

### Fixed

- Bug causing Escalation Form to show when `config.showEscalationForm=false`
- PDF download bug on Android
- Passcode Overlay scroll bug

## [1.0.0] - 2020-09-02

### Added

- Generic analytics implementation - no longer reliant on Google Analytics (see `config.analytics`)
- Add `postinstall` script to build packages
- Increased test coverage

### Changed

- Update `uneeq-js` to `0.30`
- Improve onscreen-information layout
- rename CONVERSATION_ID to PERSONA_ID in example-app
  - If you were to overwrite your own `config.ts` with `example-app/src/config.ts` you would also need to update your `.env` file to specify `REACT_APP_UNEEQ_PERSONA_ID`
- make privacy policy a blank template

### Docs

- Improve avatarPosition docs in config.js

### Fixed

- Layout bugs in Home and Passcode
- Saved items state not updating

### Removed

- Google Analytics - Generic analytics implementation added

### Tidy

- Merge & deduplicate OnScreenInfo translations
- Update packages and readme to reflect new repo location
- License field in package.json files
- Use to generic avatar name "Digital Human"
