import {TestBed} from '@angular/core/testing';

import {ImportExportService} from './import-export.service';
import {TestModule} from '@test/test.module';

describe('ImportExportService', () => {
    let service: ImportExportService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(ImportExportService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
