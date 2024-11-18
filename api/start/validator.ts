import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { JSONAPIErrorReporter } from '../app/validation_reporters.js'

vine.errorReporter = () => new JSONAPIErrorReporter()