# Project Description

An example-only UneeQ frontend UI project built using uneeq-js SDK and React. This codebase serves as an example for the developers of UneeQ’s partners / customers to build their own frontend project.

# Project delivered as-is

There is no support express or implied for this repository. While we take care to ensure compatibility and update dependencies from time to time for security reasons, you are encouraged to do your own due diligence on the dependencies used with this project. Neither P22 nor UneeQ are responsible for any issues or trouble, damages or conflicts arising from your use of this project. Please see [LICENCE.md](./LICENCE.md) for full licence.

Please see [LICENCE.md](./LICENCE.md) for full licence.

# Packages

## uneeq-react-core

Provides React state management for uneeq-js-sdk

## uneeq-react-ui

Provides a generic, customisable user interface

## uneeq-download-pdf

Renders PDFs of a conversation transcript or user-saved information for download

# Getting Started

## Create your own copy of this repo

[Fork on Gitlab](fork)

**or**

Clone [uneeq-oss/react-frontend](repo) as "upstream"

> `git clone --origin upstream git@gitlab.com:uneeq-oss/react-frontend.git`

Add your own remote as "origin"

> `git remote add origin git@github.com:you/your_repo.git`

## Create your project

Create a copy of the directory `example-app`.

> `cp example-app my-app`

Edit `package.json`

- Add your new app to `workspaces`
- Add `dev` and `build` scripts
- Edit the default `build` and `start` scripts _(optional)_

e.g.

```JSON
...
"workspaces": [
  "packages/*",
  "example-app",
  "my-app"
],
"scripts": {
  "start-my-app-only": "yarn workspace my-app start",
  "start-my-app": "concurrently \"yarn:start-packages\" \"yarn:start-my-app-only\"",
  "build-my-app-only": "yarn workspace my-app build",
  "build-my-app": "yarn build-packages && yarn build-example-only",

  "start": "yarn start-my-app",
  "build": "yarn build-my-app",

  ...
}
...
```

## Configure

Rename `my-app/.env.example` to `.env`, add your UneeQ details

## Install Dependencies

Run `yarn install`

## Run Locally

Run `yarn start`

## Customize

Edit `my-app/src/config.js`

## Build for Production

Run `yarn build`  
Copy `my-app/build` to your webserver

## Update

Avoid editing code withing `packages`. This will allow you to update your fork from [react-frontend](repo) in future.

Read the CHANGELOG to understand any changes that have been made, especially breaking changes.

Update your local:

<!-- TODO: Should we suggest merging a specific version by tag?-->

```sh
git fetch upstream
git merge upstream/master
```

See [Syncing a fork](fork-sync) for more.

# Integration

## Commands

Commands can be sent to control the front-end UI. They must be send as stringified JSON within instructions->displayHtml->html

```json
{
  "instructions": {
    "displayHtml": {
      "html": "{\"openInputBar\":true}"
    }
  }
}
```

```js
const command = { openInputBar: true };
const x = {
  instructions: {
    displayHtml: {
      html: JSON.stringify(command),
    },
  },
};
```

## Available Commands

### Keyboard input bar trigger

Switch to text input mode so the user can type a response. Useful in combination with a response like "Sorry, I didn't understand you. Could you please type that?". `true` indicates switching to text input mode, `false` indicates switching back to speach input.

**Command**: `{"openInputBar": true}`

### Chat window trigger

Show the transcript window. `true` indicates showing the users transcript, `false` indicates hiding/closing the transcript.

**Command**: `{"openTranscript": true}`

### Suggested responses

The content of suggested responses will only be triggered from the NLP platform. The suggested responses have a title and each has a label to be displayed on screen along with an utterance to be send when the user clicks that response.

**Command**:

```JSON
{
 	"mainTitle": "Call to action text: ",
   "imageUrl":"",
 	"suggestedResponses": [{
 		"label": "Suggested Response #1",
 		"utterance": "response 1"
 	}, {
 		"label": "Suggested Response #2",
 		"utterance": "response 2"
 	}, {
 		"label": "Suggested Response #3",
 		"utterance": "response 3"
 	}]
 }
```

### On-screen information trigger

The information content can only be triggered from the NLP platform. This is used to provide users with useful snippets of information.

#### Video

**Command**: `{ "information": [{ "type": "video", "source": "https://www.youtube.com/embed/rF2u7RTPsHI"}] }`

Full example (including heading):

```json
{
  "instructions": {
    "displayHtml": {
      "html": "{\"information\": [{\"type\": \"heading\", \"text\": \"Video heading here\"},{ \"type\": \"video\", \"source\": \"https://www.youtube.com/embed/rF2u7RTPsHI\", \"width\": \"100%\", \"height\": \"375\"}]}"
    }
  }
}
```

##### Information "video" Type Properties

These properties can be changed to adjust the sizing and appearance of the video.
Additionally the source value can be changed to suit any embed URL of services
where the original embed code is an iframe (e.g. Vimeo)

The video information type has not been tested with videos hosted on Amazon S3 or similar services.

| property | value                                     | type            | required |
| -------- | ----------------------------------------- | --------------- | -------- |
| type     | video                                     | string          | yes      |
| source   | https://www.youtube.com/embed/xxxxxxx     | string          | yes      |
| width    | 100% (default) or numeric value           | string / number | no       |
| height   | 375 (default) or numeric/percentage value | string / number | no       |

#### Markdown

**Command**: `{ "information": "#Heading\nInformaion\n[link](http://example.com)" }`

See [On-screen information markdown](#On-screen-information-markdown) below for more

### Feedback form trigger

Ability to trigger the feedback form from within the conversation. `true` indicates to show the feedback dialog.

**Command**: `{"openFeedback": true}`

### Human escalation form trigger

Ability to trigger the human escalation form from within the conversation which includes prompting the user for email address (if email address have not been previously provided). `true` indicates showing the escalation form.

**Command**: `{"openEscalationForm": true}`

# On-screen information markdown

[Markdown Cheatsheet](markdown-cheatsheet)

## Currently Supported tokens

- Headings: `# Heading`
- Bold: `**bold**`
- Italic: `*italic*`
- Lists: `- list item`
- Links: `[link](http://example.com)`
- Images: `![alt text](http://example.com/icon.png "Title")`

## Clickable suggested responses in markdown

URLs can be in format `say:UTTERANCE` where `UTTERANCE` is the word or phrase that should be automatically spoken to the digital human when the link is clicked.

E.g.

```
[link](say:URL encoded utterance)
```

Full example:

```
{ "information": "#Choose An Option: \n\n[Accept the deal](say:Yes I would like the deal)" }
```

# Update policy

- Semver
- Fixes may not be ported to older versions

# Test

TODO

## testState

Allows the welcome & initialisation to be skipped to go directly to a certain state

- Base [testState=%7B%7D](http://localhost:3000/?testState=%7B%7D)
- Loading [testState=%7B%22ready%22%3Afalse%2C%22loadingPercentage%22%3A40%7D](http://localhost:3000/?testState=%7B%22ready%22%3Afalse%2C%22loadingPercentage%22%3A40%7D)
- Busy [testState=%7B%22unavailable%22%3Atrue%7D](http://localhost:3000/?testState=%7B%22unavailable%22%3Atrue%7D)
- Declined [testState=%7B%22permissionAllowed%22%3Afalse%7D](http://localhost:3000/?testState=%7B%22permissionAllowed%22%3Afalse%7D)
- Transcript [testState=%7B%22transcriptOpen%22%3Atrue%2C%22transcript%22%3A%5B%7B%22message%22%3A%22Does%20this%20look%20right%3F%22%2C%22time%22%3A%221970-01-01T00%3A00%3A00.000Z%22%2C%22user%22%3Afalse%7D%2C%7B%22message%22%3A%22Yes%22%2C%22time%22%3A%221970-01-01T00%3A00%3A00.000Z%22%2C%22user%22%3Atrue%7D%5D%7D](http://localhost:3000/?testState=%7B%22transcriptOpen%22%3Atrue%2C%22transcript%22%3A%5B%7B%22message%22%3A%22Does%20this%20look%20right%3F%22%2C%22time%22%3A%221970-01-01T00%3A00%3A00.000Z%22%2C%22user%22%3Afalse%7D%2C%7B%22message%22%3A%22Yes%22%2C%22time%22%3A%221970-01-01T00%3A00%3A00.000Z%22%2C%22user%22%3Atrue%7D%5D%7D)
- Transcript Minimised [testState=%7B%22transcriptHasOpened%22%3Atrue%7D](http://localhost:3000/?testState=%7B%22transcriptHasOpened%22%3Atrue%7D)
- User Question [testState=%7B%22question%22%3A%22Does%20this%20look%20right%3F%22%7D](http://localhost:3000/?testState=%7B%22question%22%3A%22Does%20this%20look%20right%3F%22%7D)
- With Saved Items [testState=%7B%22savedItems%22%3A%5B0%5D%7D](http://localhost:3000/?testState=%7B%22savedItems%22%3A%5B0%5D%7D)
- Input Error [testState=%7B%22noInput%22%3Atrue%7D](http://localhost:3000/?testState=%7B%22noInput%22%3Atrue%7D)
- With Saved Items and Minimised Transcript [testState=%7B%22savedItems%22%3A%5B0%5D%2C%22transcriptHasOpened%22%3Atrue%7D](http://localhost:3000/?testState=%7B%22savedItems%22%3A%5B0%5D%2C%22transcriptHasOpened%22%3Atrue%7D)
- Text Input [testState=%7B%22inputMode%22%3A%22text%22%7D](http://localhost:3000/?testState=%7B%22inputMode%22%3A%22text%22%7D)
- End Session [testState=%7B%22endConfirmOpen%22%3Atrue%7D](http://localhost:3000/?testState=%7B%22endConfirmOpen%22%3Atrue%7D)
- Escalation Form [testState=%7B%22escalationFormOpen%22%3Atrue%7D](http://localhost:3000/?testState=%7B%22escalationFormOpen%22%3Atrue%7D)
- Feedback [testState=%7B%22feedbackOpen%22%3Atrue%7D](http://localhost:3000/?testState=%7B%22feedbackOpen%22%3Atrue%7D)
- Settings [testState=%7B%22settingsOpen%22%3Atrue%2C%22selectedDevices%22%3A%7B%7D%2C%22devices%22%3A%7B%22audioInput%22%3A%5B%5D%2C%22videoInput%22%3A%5B%5D%2C%22audioOutput%22%3A%5B%5D%7D%7D](http://localhost:3000/?testState=%7B%22settingsOpen%22%3Atrue%2C%22selectedDevices%22%3A%7B%7D%2C%22devices%22%3A%7B%22audioInput%22%3A%5B%5D%2C%22videoInput%22%3A%5B%5D%2C%22audioOutput%22%3A%5B%5D%7D%7D)
- Menu [testState=%7B%22menuOpen%22%3Atrue%7D](http://localhost:3000/?testState=%7B%22menuOpen%22%3Atrue%7D)
- On-screen Info [testState=%7B%22onScreenInfo%22%3A%7B%22information%22%3A%5B%7B%22type%22%3A%22markdown%22%2C%22markdown%22%3A%22%23%20Heading%5CnParagraph%5Cn\*%20Bullet%20%5Blink%5D(%2F)%22%7D%5D%7D%7D](<http://localhost:3000/?testState=%7B%22onScreenInfo%22%3A%7B%22information%22%3A%5B%7B%22type%22%3A%22markdown%22%2C%22markdown%22%3A%22%23%20Heading%5CnParagraph%5Cn*%20Bullet%20%5Blink%5D(%2F)%22%7D%5D%7D%7D>)
- Expanded On-screen Info [testState=%7B%22onScreenInfo%22%3A%7B%22information%22%3A%5B%7B%22type%22%3A%22markdown%22%2C%22markdown%22%3A%22%23%20Heading%5CnParagraph%5Cn\*%20Bullet%20%5Blink%5D(%2F)%22%7D%5D%7D%2C%22expandedInfo%22%3Atrue%7D](<http://localhost:3000/?testState=%7B%22onScreenInfo%22%3A%7B%22information%22%3A%5B%7B%22type%22%3A%22markdown%22%2C%22markdown%22%3A%22%23%20Heading%5CnParagraph%5Cn*%20Bullet%20%5Blink%5D(%2F)%22%7D%5D%7D%2C%22expandedInfo%22%3Atrue%7D>)
- Suggested Responses [testState=%7B%22onScreenInfo%22%3A%7B%22suggestedResponses%22%3A%7B%22id%22%3A1%2C%22mainTitle%22%3A%22You%20can%20ask%20me%20about%3A%22%2C%22suggestedResponses%22%3A%5B%7B%22label%22%3A%22Suggestion%201%22%2C%22utterance%22%3A%221%22%7D%2C%7B%22label%22%3A%22Suggestion%202%22%2C%22utterance%22%3A%222%22%7D%2C%7B%22label%22%3A%22Suggestion%203%22%2C%22utterance%22%3A%223%22%7D%5D%7D%7D%7D\* ](http://localhost:3000/?testState=%7B%22onScreenInfo%22%3A%7B%22suggestedResponses%22%3A%7B%22id%22%3A1%2C%22mainTitle%22%3A%22You%20can%20ask%20me%20about%3A%22%2C%22suggestedResponses%22%3A%5B%7B%22label%22%3A%22Suggestion%201%22%2C%22utterance%22%3A%221%22%7D%2C%7B%22label%22%3A%22Suggestion%202%22%2C%22utterance%22%3A%222%22%7D%2C%7B%22label%22%3A%22Suggestion%203%22%2C%22utterance%22%3A%223%22%7D%5D%7D%7D%7D*)

# Licence

No warranty or support is implied by UneeQ, please refer to LICENCE.md

[repo]: https://gitlab.com/uneeq-oss/react-frontend
[fork]: https://docs.gitlab.com/ee/user/project/repository/forking_workflow.html#creating-a-fork
[fork-sync]: https://docs.gitlab.com/ee/user/project/repository/forking_workflow.html
[markdown-cheatsheet]: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
