import { Test, TestingModule } from '@nestjs/testing';
import { AguacateController } from './aguacate.controller';

describe('AguacateController', () => {
  let controller: AguacateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AguacateController],
    }).compile();

    controller = module.get<AguacateController>(AguacateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
