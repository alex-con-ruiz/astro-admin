import {describe, test, expect} from 'vitest';
import { handleParams } from '.';

type TestParams = {
    test: string;
}

describe('handleParams utility' ,() => {
	test('should return an object from generic',()=>{
		const request = { url: new URL('https://falseDNS.mock/api/test?test=testValue')};
        
		const params = handleParams<TestParams>(request);       
        
		expect(params.test).toEqual('testValue');
	});
});
