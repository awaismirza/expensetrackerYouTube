import {TestBed} from '@angular/core/testing';

import {ActionService} from './action.service';
import {ExpenseInterface} from "../../interface/expenseInterface";

describe('ActionService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: ActionService = TestBed.get(ActionService);
		expect(service).toBeTruthy();
	});

});
