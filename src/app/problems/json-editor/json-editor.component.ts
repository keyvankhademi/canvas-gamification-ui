import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SchemaService} from '@app/problems/_services/schema.service';

// eslint-disable-next-line @typescript-eslint/naming-convention
declare let JSONEditor: any;

@Component({
    selector: 'app-json-editor',
    templateUrl: './json-editor.component.html',
    styleUrls: ['./json-editor.component.scss'],
})
export class JsonEditorComponent implements OnInit {
    // TODO - Determine the Proper Typing.
    editor: any;
    @Input() name: string;
    @Input() value: any;
    @Output() readonly valueChange = new EventEmitter<JSON>();

    constructor(private schemaService: SchemaService) {
    }

    ngOnInit(): void {
        const element = document.getElementById('editor');
        //change ID to make sure each editor is separated
        element.id = name;
        this.schemaService.getSchema(this.name).subscribe(schema => {
            this.editor = new JSONEditor(element, {
                schema,
                theme: 'bootstrap4',
                no_additional_properties: true,
                disable_properties: true,
                disable_collapse: true,
                disable_array_reorder: true,
                disable_array_delete_all_rows: true,
                disable_array_delete_last_row: true,
                disable_edit_json: true,
                remove_empty_properties: true,
                object_layout: 'grid',
                compact: true
            });

            this.editor.on('change', () => {
                this.changeValue(this.editor.getValue());
            });

            this.editor.setValue(this.value);
        });
    }

    /**
     * Emitter for when the value in the editor changes.
     * @param value - The new value.
     */
    changeValue(value: JSON): void {
        this.valueChange.emit(value);
    }
}
