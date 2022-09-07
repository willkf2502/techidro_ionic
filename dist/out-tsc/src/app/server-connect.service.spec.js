import { TestBed } from '@angular/core/testing';
import { ServerConnectService } from './server-connect.service';
describe('ServerConnectService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ServerConnectService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=server-connect.service.spec.js.map