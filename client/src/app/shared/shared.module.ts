import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { QuillModule } from "ngx-quill";
import { BotFooterComponent } from "./footer/bot-footer/bot-footer.component";
import { FooterComponent } from "./footer/footer.component";
import { MidFooterComponent } from "./footer/mid-footer/mid-footer.component";
import { TopFooterComponent } from "./footer/top-footer/top-footer.component";


@NgModule({
    declarations:[
        FooterComponent,
        TopFooterComponent,
        MidFooterComponent,
        BotFooterComponent
    ],
    imports:[
        HttpClientModule,
        QuillModule.forRoot()
    ],
    exports:[
        HttpClientModule,
        QuillModule,
        FooterComponent,
        TopFooterComponent,
        MidFooterComponent,
        BotFooterComponent
    ],
})

export class SharedModule {}