import { IResultService } from '@/interfaces/IResultService';

class ResultService implements IResultService {
    private static instance: IResultService;

    constructor() {
        ResultService.instance = this;
    }

    static getInstance(): ResultService {
        if (this.instance) {
            return this.instance;
        }
        return new ResultService();
    }
}

export default ResultService;
