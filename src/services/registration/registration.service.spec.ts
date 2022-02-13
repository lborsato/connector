import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationService } from './registration.service';
import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

describe('RegistrationService', () => {
  let service: RegistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistrationService, HttpService, ConfigService],
    }).compile();

    service = module.get<RegistrationService>(RegistrationService);
  });

  it('register', () => {
    expect(service).toBeDefined();
  });
});
