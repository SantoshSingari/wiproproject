import { Message } from 'primeng/primeng';

export class MessageAlert {

    showErrorMsg(severity: string, message: string, msgs: Message[]) {
        msgs = [];
        msgs.push({ severity: severity, summary: message });
        setTimeout(() => {
            msgs = [];
        }, 2000);
    }
}