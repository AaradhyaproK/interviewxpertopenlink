/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ANTHROPIC_API_KEY: string;
    readonly VITE_BEDROCK_CHAT_BASE_URL: string;
    readonly VITE_BEDROCK_MODEL_QUESTIONS: string;
    readonly VITE_BEDROCK_MODEL_REPORT: string;
    readonly VITE_BEDROCK_MODEL_DEFAULT: string;
    readonly VITE_ANTHROPIC_WORKSPACE_ID: string;
    readonly VITE_ASSEMBLYAI_API_KEY: string;
    readonly VITE_CLOUDINARY_CLOUD_NAME: string;
    readonly VITE_CLOUDINARY_UPLOAD_PRESET: string;
    readonly VITE_OPENAI_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
