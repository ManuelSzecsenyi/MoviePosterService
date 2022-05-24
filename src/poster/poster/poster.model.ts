export interface IMovie {
    posterUrl: string;
    name: string;
    availableAt: {
        netflix: boolean;
        prime: boolean;
        disney: boolean;
    }
}