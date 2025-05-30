import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async register(dto: RegisterDto) {
        const exists = await this.userRepo.findOne({ where: { username: dto.username } });
        if (exists) throw new ConflictException('User already exists');

        const hashed = await bcrypt.hash(dto.password, 10);
        const user = this.userRepo.create({ ...dto, password: hashed });
        await this.userRepo.save(user);

        return { message: 'Registered successfully' };
    }

    async login(dto: LoginDto) {
        const user = await this.userRepo.findOne({ where: { username: dto.username } });
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const match = await bcrypt.compare(dto.password, user.password);
        if (!match) throw new UnauthorizedException('Invalid credentials');

        const token = this.jwtService.sign({ sub: user.id, username: user.username });
        return { access_token: token };
    }

    async getMe(userId: string) {
        return this.userRepo.findOne({ where: { id: userId } });
    }
}
